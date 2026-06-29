import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';

@Entity('password_reset_otps')
export class PasswordResetOTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: string;

  @Column()
  adminId: number;

  @ManyToOne(() => Admin, (admin) => admin.passwordResetOTPs)
  @JoinColumn({ name: 'adminId' })
  admin: Admin;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  attempts: number;

  @Column({ default: false })
  isUsed: boolean;
}
