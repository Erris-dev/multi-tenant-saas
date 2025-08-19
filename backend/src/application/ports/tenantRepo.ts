import { Tenant } from "../../domain/entities/Tenant";

export interface TenantRepository {
  findById(id: string): Promise<Tenant | null>;
  findBySubdomain(subdomain: string): Promise<Tenant | null>;
  save(tenant: Tenant): Promise<Tenant>;
}
