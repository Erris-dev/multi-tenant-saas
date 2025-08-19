import { ProjectRepository } from "../../application/ports/projectRepo";
import { Project } from "../../domain/entities/Project";
import { ProjectEntity } from "../database/entities/ProjectType";
import { AppDataSource } from "../database/PostgreConfig";
import { Repository } from "typeorm";

export class PostgreProjectRepo implements ProjectRepository {
  private ormRepo: Repository<ProjectEntity>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(ProjectEntity);
  }

  async findById(id: string): Promise<Project | null> {
    const entity = await this.ormRepo.findOne({ where: {id},relations: ['tenant','createdBy'] });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByName(name: string): Promise<Project | null> {
    const entity = await this.ormRepo.findOne({ where: {name}});
    if (!entity) return null;
    return this.toDomain(entity);   
  }

  async findAll(): Promise<Project[]> {
    const entities = await this.ormRepo.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findAllByUserId(userId: string): Promise<Project[]> {
    const entities = await this.ormRepo.findBy({ createdBy: { id: userId} });
    return entities.map(entity => this.toDomain(entity));
  }

  async save(project: Project): Promise<Project> {
    const entity = await this.ormRepo.save(this.toEntity(project));
    return this.toDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: ProjectEntity): Project {
    console.log('Entity object being converted:', entity);
    return new Project({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      userId: entity.createdBy.id,
      status: entity.status,
      start_date: entity.start_date,
      end_date: entity.end_date,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      tenantId: entity.tenant.id
    });
  }

  private toEntity(domain: Project): Partial<ProjectEntity> {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      status: domain.status,
      start_date: domain.start_date,
      end_date: domain.end_date,
      createdBy: { id: domain.userId } as any,
      updated_at: domain.updated_at,
      tenant: { id: domain.tenantId } as any,

    };
  }
}