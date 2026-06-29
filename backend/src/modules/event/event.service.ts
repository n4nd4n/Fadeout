import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventParticipant } from './entities/event-participant.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventParticipant)
    private participantRepository: Repository<EventParticipant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.eventRepository.createQueryBuilder('event')
      .where('event.deletedAt IS NULL');

    // Search filter (event name, host name, description, location)
    if (query.search) {
      const search = `%${query.search}%`;
      queryBuilder.andWhere(
        '(event.eventName ILIKE :search OR event.hostName ILIKE :search OR event.description ILIKE :search OR event.location ILIKE :search)',
        { search },
      );
    }

    // Status filter
    if (query.status && query.status !== 'all') {
      queryBuilder.andWhere('LOWER(event.status) = :status', { status: query.status.toLowerCase() });
    }

    // Date filters
    if (query.startDate) {
      queryBuilder.andWhere('event.startDate >= :startDate', { startDate: new Date(query.startDate) });
    }
    if (query.endDate) {
      queryBuilder.andWhere('event.startDate <= :endDate', { endDate: new Date(query.endDate) });
    }

    // Sorting
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = (query.sortOrder || 'DESC').toUpperCase() as 'ASC' | 'DESC';

    const columnMap: Record<string, string> = {
      id: 'event.id',
      eventId: 'event.eventId',
      eventName: 'event.eventName',
      title: 'event.eventName',
      name: 'event.eventName',
      hostName: 'event.hostName',
      startDate: 'event.startDate',
      expiryDate: 'event.expiryDate',
      status: 'event.status',
      createdAt: 'event.createdAt',
    };

    const orderColumn = columnMap[sortBy] || 'event.createdAt';
    queryBuilder.orderBy(orderColumn, sortOrder);

    const [records, totalRecords] = await queryBuilder
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      records: records.map(r => this.mapEvent(r)),
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        pageSize: limit,
      },
    };
  }

  async findDetail(eventIdParam: string) {
    // Find the event by DB id or eventId string
    const event = await this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.createdByUser', 'creator')
      .leftJoinAndSelect('event.hostUser', 'host')
      .leftJoinAndSelect('event.participants', 'participant')
      .where('event.id = :id OR event.eventId = :eventId', {
        id: isNaN(Number(eventIdParam)) ? -1 : Number(eventIdParam),
        eventId: eventIdParam,
      })
      .andWhere('event.deletedAt IS NULL')
      .getOne();

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventIdParam} not found`);
    }

    // Fetch participant list with details
    const participants = event.participants || [];

    const rsvpSummary = {
      going: participants.filter(p => p.rsvpStatus.toLowerCase() === 'going').length,
      maybe: participants.filter(p => p.rsvpStatus.toLowerCase() === 'maybe').length,
      notGoing: participants.filter(p => p.rsvpStatus.toLowerCase() === 'not going').length,
    };

    const checkInSummary = {
      checkedIn: participants.filter(p => p.checkedIn).length,
      notCheckedIn: participants.filter(p => !p.checkedIn).length,
    };

    return {
      eventInformation: this.mapEvent(event),
      hostInformation: event.hostUser ? {
        id: event.hostUser.id,
        fullName: `${event.hostUser.firstName} ${event.hostUser.lastName}`,
        email: event.hostUser.email,
        profileImage: event.hostUser.profileImage,
      } : { fullName: event.hostName },
      creatorInformation: event.createdByUser ? {
        id: event.createdByUser.id,
        fullName: `${event.createdByUser.firstName} ${event.createdByUser.lastName}`,
        email: event.createdByUser.email,
      } : null,
      participantList: participants.map(p => ({
        id: p.id,
        userId: p.userId,
        userName: p.userName,
        email: p.email,
        rsvpStatus: p.rsvpStatus,
        checkedIn: p.checkedIn,
        rsvpDate: p.rsvpDate ? p.rsvpDate.toISOString() : null,
      })),
      rsvpSummary,
      checkInSummary,
    };
  }

  private mapEvent(event: Event) {
    return {
      id: event.id,
      eventId: event.eventId,
      eventName: event.eventName,
      title: event.eventName,
      description: event.description,
      hostName: event.hostName,
      startDate: event.startDate.toISOString(),
      expiryDate: event.expiryDate.toISOString(),
      status: event.status.toLowerCase(), // frontend expects lowercase (active, expired)
      totalInvited: event.totalInvited,
      acceptedCount: event.acceptedCount,
      declinedCount: event.declinedCount,
      pendingCount: event.pendingCount,
      checkedInCount: event.checkedInCount,
      location: event.location,
      createdAt: event.createdAt.toISOString(),
      createdDate: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    };
  }
}
