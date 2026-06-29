import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { EventParticipant } from '../../event/entities/event-participant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'verification_token', length: 255, nullable: true })
  verificationToken: string;

  @Column({ name: 'verification_token_expires_at', type: 'timestamp', nullable: true })
  verificationTokenExpiresAt: Date;

  @Column({ name: 'profile_image', length: 500, nullable: true })
  profileImage: string;

  @Column({ name: 'events_created', default: 0 })
  eventsCreated: number;

  @Column({ name: 'events_joined', default: 0 })
  eventsJoined: number;

  @Column({ name: 'deleted_reason', type: 'text', nullable: true })
  deletedReason: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Event, (event) => event.createdByUser)
  createdEvents: Event[];

  @OneToMany(() => Event, (event) => event.hostUser)
  hostedEvents: Event[];

  @OneToMany(() => EventParticipant, (participant) => participant.user)
  participations: EventParticipant[];
}
