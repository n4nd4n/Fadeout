import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_notifications')
export class SystemNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'template_id', unique: true, length: 150 })
  templateId: string;

  @Column({ name: 'template_code', unique: true, length: 150 })
  templateCode: string;

  @Column({ name: 'template_title', length: 250 })
  templateTitle: string;

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
