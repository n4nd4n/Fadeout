import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { PasswordResetOTP } from '../../auth/entities/password-reset-otp.entity';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: ['Super Admin', 'Admin', 'Editor'],
    default: 'Admin',
  })
  role: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RefreshToken, (token) => token.admin)
  refreshTokens: RefreshToken[];

  @OneToMany(() => PasswordResetOTP, (otp) => otp.admin)
  passwordResetOTPs: PasswordResetOTP[];
}
