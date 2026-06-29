import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('static_pages')
export class StaticPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'page_name', length: 150 })
  pageName: string;

  @Column({ unique: true, length: 150 })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by', length: 150, nullable: true })
  updatedBy: string;
}
