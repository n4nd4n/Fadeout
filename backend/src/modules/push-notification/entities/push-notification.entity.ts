import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('push_notifications')
export class PushNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'template_id', unique: true, length: 150 })
  templateId: string;

  @Column({ name: 'template_name', length: 250 })
  templateName: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by', length: 150, nullable: true })
  updatedBy: string;
}
