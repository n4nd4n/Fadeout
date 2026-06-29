import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async getStats(dateRange: string) {
    // Determine start date based on dateRange
    let startDate: Date | null = null;
    const now = new Date();
    if (dateRange === 'last-month') {
      startDate = new Date();
      startDate.setDate(now.getDate() - 30);
    } else if (dateRange === 'last-3-months') {
      startDate = new Date();
      startDate.setDate(now.getDate() - 90);
    } else if (dateRange === 'last-6-months') {
      startDate = new Date();
      startDate.setDate(now.getDate() - 180);
    }

    // 1. Total Users
    const totalUsersQuery = this.userRepository.createQueryBuilder('user')
      .where('user.deletedAt IS NULL');
    if (startDate) {
      totalUsersQuery.andWhere('user.createdAt >= :startDate', { startDate });
    }
    const totalUsers = await totalUsersQuery.getCount();

    // 2. Active Users
    const activeUsersQuery = this.userRepository.createQueryBuilder('user')
      .where('user.deletedAt IS NULL')
      .andWhere('user.isActive = true');
    if (startDate) {
      activeUsersQuery.andWhere('user.createdAt >= :startDate', { startDate });
    }
    const activeUsers = await activeUsersQuery.getCount();

    // 3. Inactive Users
    const inactiveUsers = totalUsers - activeUsers;

    // 4. Deleted Users
    const deletedUsersQuery = this.userRepository.createQueryBuilder('user')
      .withDeleted()
      .where('user.deletedAt IS NOT NULL');
    if (startDate) {
      deletedUsersQuery.andWhere('user.deletedAt >= :startDate', { startDate });
    }
    const deletedUsers = await deletedUsersQuery.getCount();
    const totalIncludingDeleted = totalUsers + deletedUsers;
    const deletedPercentage = totalIncludingDeleted > 0 
      ? ((deletedUsers / totalIncludingDeleted) * 100).toFixed(1)
      : '0.0';

    // 5. Total Events
    const totalEventsQuery = this.eventRepository.createQueryBuilder('event')
      .where('event.deletedAt IS NULL');
    if (startDate) {
      totalEventsQuery.andWhere('event.createdAt >= :startDate', { startDate });
    }
    const totalEvents = await totalEventsQuery.getCount();

    // 6. Events Active (Right Now)
    const activeEventsQuery = this.eventRepository.createQueryBuilder('event')
      .where('event.deletedAt IS NULL')
      .andWhere('LOWER(event.status) = :status', { status: 'active' });
    if (startDate) {
      activeEventsQuery.andWhere('event.createdAt >= :startDate', { startDate });
    }
    const activeEvents = await activeEventsQuery.getCount();

    // 7. Events Faded (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const fadedEventsQuery = this.eventRepository.createQueryBuilder('event')
      .where('event.deletedAt IS NULL')
      .andWhere('LOWER(event.status) = :status', { status: 'expired' })
      .andWhere('event.expiryDate >= :sevenDaysAgo', { sevenDaysAgo })
      .andWhere('event.expiryDate <= :now', { now });
    if (startDate) {
      fadedEventsQuery.andWhere('event.createdAt >= :startDate', { startDate });
    }
    const fadedEvents = await fadedEventsQuery.getCount();

    // 8. Repeat Event Creators (%)
    const creatorQuery = this.eventRepository.createQueryBuilder('event')
      .select('event.createdByUserId', 'userId')
      .addSelect('COUNT(event.id)', 'count')
      .where('event.deletedAt IS NULL');
    if (startDate) {
      creatorQuery.andWhere('event.createdAt >= :startDate', { startDate });
    }
    const creators = await creatorQuery
      .groupBy('event.createdByUserId')
      .getRawMany();

    const totalCreators = creators.length;
    const repeatCreators = creators.filter(c => parseInt(c.count, 10) >= 2).length;
    const repeatPercentage = totalCreators > 0
      ? Math.round((repeatCreators / totalCreators) * 100)
      : 0;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      deletedUsers,
      deletedPercentage: `${deletedPercentage}%`,
      totalEvents,
      activeEvents,
      fadedEvents,
      repeatPercentage: `${repeatPercentage}%`,
    };
  }
}
