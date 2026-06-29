import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EventParticipant } from './event-participant.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'event_id', unique: true, length: 255 })
  eventId: string;

  @Column({ name: 'event_name', length: 255 })
  eventName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'host_name', length: 255 })
  hostName: string;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'expiry_date', type: 'timestamp' })
  expiryDate: Date;

  @Column({ length: 50 })
  status: string; // Draft, Upcoming, Active, Completed, Expired, Cancelled

  @Column({ name: 'total_invited', default: 0 })
  totalInvited: number;

  @Column({ name: 'accepted_count', default: 0 })
  acceptedCount: number;

  @Column({ name: 'declined_count', default: 0 })
  declinedCount: number;

  @Column({ name: 'pending_count', default: 0 })
  pendingCount: number;

  @Column({ name: 'checked_in_count', default: 0 })
  checkedInCount: number;

  @Column({ length: 255 })
  location: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ name: 'created_by_user_id', type: 'bigint' })
  createdByUserId: string;

  @ManyToOne(() => User, (user) => user.createdEvents)
  @JoinColumn({ name: 'created_by_user_id' })
  createdByUser: User;

  @Column({ name: 'host_user_id', type: 'bigint' })
  hostUserId: string;

  @ManyToOne(() => User, (user) => user.hostedEvents)
  @JoinColumn({ name: 'host_user_id' })
  hostUser: User;

  @OneToMany(() => EventParticipant, (participant) => participant.event)
  participants: EventParticipant[];
}
