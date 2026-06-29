import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull, Not } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .withDeleted() // To handle both, but standard findAll should exclude deleted users
      .where('user.deletedAt IS NULL');

    // Filtering by search (name or email)
    if (query.search) {
      const search = `%${query.search}%`;
      queryBuilder.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
        { search },
      );
    }

    // Filter by active status
    if (query.is_active !== undefined) {
      const isActive = query.is_active === 'true' || query.is_active === true;
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    // Filter by verified status
    if (query.is_verified !== undefined) {
      const isVerified = query.is_verified === 'true' || query.is_verified === true;
      queryBuilder.andWhere('user.isVerified = :isVerified', { isVerified });
    }

    // Sorting
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = (query.sortOrder || 'DESC').toUpperCase() as 'ASC' | 'DESC';

    // Map column names
    const columnMap: Record<string, string> = {
      id: 'user.id',
      email: 'user.email',
      firstName: 'user.firstName',
      lastName: 'user.lastName',
      isVerified: 'user.isVerified',
      isActive: 'user.isActive',
      eventsCreated: 'user.eventsCreated',
      eventsJoined: 'user.eventsJoined',
      createdAt: 'user.createdAt',
    };

    if (sortBy === 'name' || sortBy === 'fullName') {
      queryBuilder
        .orderBy('user.firstName', sortOrder)
        .addOrderBy('user.lastName', sortOrder);
    } else {
      const orderColumn = columnMap[sortBy] || 'user.createdAt';
      queryBuilder.orderBy(orderColumn, sortOrder);
    }

    const [records, totalRecords] = await queryBuilder
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      records: records.map(r => this.mapUser(r)),
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        pageSize: limit,
      },
    };
  }

  async findDeleted(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .withDeleted()
      .where('user.deletedAt IS NOT NULL');

    // Filtering by search (name or email)
    if (query.search) {
      const search = `%${query.search}%`;
      queryBuilder.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
        { search },
      );
    }

    // Sorting
    const sortBy = query.sortBy || 'deletedAt';
    const sortOrder = (query.sortOrder || 'DESC').toUpperCase() as 'ASC' | 'DESC';

    const columnMap: Record<string, string> = {
      id: 'user.id',
      email: 'user.email',
      firstName: 'user.firstName',
      lastName: 'user.lastName',
      deletedAt: 'user.deletedAt',
      deletedReason: 'user.deletedReason',
    };

    if (sortBy === 'name' || sortBy === 'fullName') {
      queryBuilder
        .orderBy('user.firstName', sortOrder)
        .addOrderBy('user.lastName', sortOrder);
    } else {
      const orderColumn = columnMap[sortBy] || 'user.deletedAt';
      queryBuilder.orderBy(orderColumn, sortOrder);
    }

    const [records, totalRecords] = await queryBuilder
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      records: records.map(r => this.mapUser(r)),
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        pageSize: limit,
      },
    };
  }

  async findDetail(userId: string) {
    // Find the user including soft deleted ones
    const cleanId = userId.replace(/[^0-9]/g, '');
    const user = await this.userRepository.findOne({
      where: { id: cleanId || userId },
      withDeleted: true,
      relations: ['createdEvents', 'createdEvents.participants', 'participations', 'participations.event'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const createdEvents = (user.createdEvents || []).map(e => ({
      id: e.id,
      eventId: e.eventId,
      eventName: e.eventName,
      title: e.eventName,
      category: 'Community',
      dateTime: e.startDate.toISOString(),
      location: e.location,
      hostName: e.hostName,
      startDate: e.startDate.toISOString(),
      expiryDate: e.expiryDate.toISOString(),
      status: e.status.toLowerCase(),
      createdAt: e.createdAt.toISOString(),
      createdDate: e.createdAt.toISOString(),
    }));

    const joinedEvents = (user.participations || []).map(p => {
      const e = p.event;
      if (!e) return null;
      return {
        id: e.id,
        eventId: e.eventId,
        eventName: e.eventName,
        title: e.eventName,
        category: 'Community',
        dateTime: e.startDate.toISOString(),
        location: e.location,
        hostName: e.hostName,
        startDate: e.startDate.toISOString(),
        expiryDate: e.expiryDate.toISOString(),
        status: e.status.toLowerCase(),
        createdAt: e.createdAt.toISOString(),
        rsvpStatus: p.rsvpStatus.toLowerCase(),
      };
    }).filter(e => e !== null);

    return {
      profile: this.mapUser(user),
      basicInformation: this.mapUser(user),
      totalEventsCreated: createdEvents.length,
      totalEventsJoined: joinedEvents.length,
      createdEventsList: createdEvents,
      joinedEventsList: joinedEvents,
    };
  }

  async toggleStatus(userId: string) {
    const cleanId = userId.replace(/[^0-9]/g, '');
    const user = await this.userRepository.findOne({ where: { id: cleanId || userId } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.isActive = !user.isActive;
    await this.userRepository.save(user);
    return this.mapUser(user);
  }

  private mapUser(user: User) {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      status: user.isActive ? 'active' : 'inactive',
      eventsCreated: user.eventsCreated,
      eventsJoined: user.eventsJoined,
      createdDate: user.createdAt.toISOString(),
      isDeleted: user.deletedAt !== null,
      description: user.deletedReason || undefined,
      deletedDate: user.deletedAt ? user.deletedAt.toISOString() : undefined,
    };
  }
}
