import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_settings')
export class SystemSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'company_name', length: 150 })
  companyName: string;

  @Column({ name: 'max_login_attempts', type: 'integer' })
  maxLoginAttempts: number;

  @Column({ name: 'session_timeout_minutes', type: 'integer' })
  sessionTimeoutMinutes: number;

  @Column({ name: 'copyright_text', length: 200 })
  copyrightText: string;

  @Column({ name: 'android_app_version', length: 32 })
  androidAppVersion: string;

  @Column({ name: 'android_force_update', default: false })
  androidForceUpdate: boolean;

  @Column({ name: 'ios_app_version', length: 32 })
  iosAppVersion: string;

  @Column({ name: 'ios_force_update', default: false })
  iosForceUpdate: boolean;

  @Column({ name: 'logo_path', length: 500, nullable: true })
  logoPath: string;

  @Column({ name: 'favicon_path', length: 500, nullable: true })
  faviconPath: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
