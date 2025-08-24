// src/infrastructure/database/entities/TaskEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ProjectEntity } from './ProjectType';
import { UserEntity } from './userType';
import { TenantEntity } from './tenantType';

export enum TaskType {
  BUG = 'bug',
  FEATURE = 'feature',
  IMPROVEMENT = 'improvement',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}
export enum TaskPriority {
  LOW = 'low',
  MEMDIUM = 'medium',
  HIGH = 'high'
}


@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TaskType, default: TaskType.FEATURE })
  type!: TaskType;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;


  @Column({ type: 'date', nullable: true })
  due_date?: Date;

  // Tenant relation
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: TenantEntity;

  // Project relation
  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project!: ProjectEntity;

  // Optional: assigned user
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'assignee_id' })
  assignee?: UserEntity;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
