// src/infrastructure/database/entities/TenantEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserEntity } from '././userType';
import { ProjectEntity } from './ProjectType';

export enum Plan {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise"
}

@Entity({ name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string; // Organization / company name

  @Column({ type: 'varchar', length: 50, unique: true })
  subdomain!: string; // e.g., "acme" for acme.myapp.com

  @Column({ type: 'varchar', length: 50, default: Plan.FREE })
  plan!: Plan;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // One tenant has many users
  @OneToMany(() => UserEntity, (user) => user.tenant)
  users!: UserEntity[];

  // One tenant has many projects
  @OneToMany(() => ProjectEntity, (project) => project.tenant)
  projects!: ProjectEntity[];
}
