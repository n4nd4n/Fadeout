import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Event } from './event.entity';

@Entity('event_participants')
export class EventParticipant {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'event_id', type: 'bigint' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.participants)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: string;

  @ManyToOne(() => User, (user) => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_name', length: 255 })
  userName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'rsvp_status', length: 50 })
  rsvpStatus: string; // going, maybe, not going

  @Column({ name: 'checked_in', default: false })
  checkedIn: boolean;

  @Column({ name: 'rsvp_date', type: 'timestamp', nullable: true })
  rsvpDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
