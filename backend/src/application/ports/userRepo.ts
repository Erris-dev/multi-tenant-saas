import  { User } from "../../domain/entities/User";

export interface UserRepository {
    findByEmailandTenant(email: string, tenantId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
}