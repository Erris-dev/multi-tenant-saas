import { TenantRepository } from "../../application/ports/tenantRepo";
import { TenantEntity } from "../database/entities/tenantType";
import { Tenant } from "../../domain/entities/Tenant";
import { AppDataSource } from "../database/PostgreConfig";

import { Repository } from "typeorm";

export class PostgreTenantRepository implements TenantRepository {
  private repo: Repository<TenantEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(TenantEntity);
  }

  async findById(id: string): Promise<Tenant | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    const entity = await this.repo.findOne({ where: { subdomain } });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async save(tenant: Tenant): Promise<Tenant> {
    const entity = this.repo.create(this.toEntity(tenant));
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: TenantEntity): Tenant {
    return new Tenant({
      id: entity.id,
      name: entity.name,
      subdomain: entity.subdomain,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    });
  }

  private toEntity(tenant: Tenant): Partial<TenantEntity> {
    return {
      id: tenant.id,
      name: tenant.name,
      subdomain: tenant.subdomain,
      created_at: tenant.createdAt,
      updated_at: tenant.updatedAt,
      
    };
  }
}
