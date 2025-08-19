// src/infrastructure/database/entities/ProjectEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { TenantEntity } from './tenantType';
import { UserEntity } from './userType';
import { TaskEntity} from './TaskType';

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

@Entity({ name: 'projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.PLANNING })
  status!: ProjectStatus;

  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  // Tenant relation
  @ManyToOne(() => TenantEntity, (tenant) => tenant.projects)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: TenantEntity;

  // Optional: user who created the project
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks!: TaskEntity[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
