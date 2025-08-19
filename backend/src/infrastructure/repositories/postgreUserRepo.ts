import { UserRepository } from "../../application/ports/userRepo";
import { User } from "../../domain/entities/User";
import { UserEntity } from "../database/entities/userType";
import { AppDataSource } from "../database/PostgreConfig";
import { Repository } from "typeorm";

export class PostgreUserRepo implements UserRepository {
  private ormRepo: Repository<UserEntity>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(UserEntity);
  }

  async findByEmailandTenant(email: string, tenantId: string): Promise<User | null> {
    const entity = await this.ormRepo.findOne({ where: { email, tenant: { id: tenantId } }, relations: ["tenant"] });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
      const entity = await this.ormRepo.findOne({ where: { email }, relations: ["tenant"] });
      if (!entity) return null;
      return this.toDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return entity ? this.toDomain(entity) : null
  }

  async save(user: User): Promise<User> {
    const entity = this.ormRepo.create(this.toEntity(user));
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      passwordHash: entity.passwordHash,
      isActive: entity.isActive,
      tenantId: entity.tenant.id
    });
  }

  private toEntity(user: User): Partial<UserEntity> {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      passwordHash: (user as any).passwordHash,
      isActive: user.isActive,
      tenant: { id: user.tenantId } as any,
    };
  }
}
