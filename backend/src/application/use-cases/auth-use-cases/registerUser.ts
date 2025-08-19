import { UserRepository } from "../../ports/userRepo";
import { RegisterUserRequest, RegisterUserResponse } from "../../dto/authDTO";
import { TokenService } from "../../ports/tokenService";
import { User } from "../../../domain/entities/User";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { TenantRepository } from "../../ports/tenantRepo";
import { Tenant } from "../../../domain/entities/Tenant";

export class RegisterUser {
  constructor(
    private userRepo: UserRepository,
    private tenantRepo: TenantRepository,
    private jwtService: TokenService
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const subdomainValue = request.subdomain ?? "";
    //1. Kqyre a ekziston ky mut niher
    let tenant = await this.tenantRepo.findBySubdomain(subdomainValue);
    if (!tenant) {
      tenant = new Tenant({
        id: randomUUID(),
        subdomain: subdomainValue,
      });
      tenant = await this.tenantRepo.save(tenant);
    }

    const existing = await this.userRepo.findByEmailandTenant(request.email, tenant.id);
    if (existing) {
      throw new Error("Ky mut veq ekziston brenda databazes");
    }

    //2. Mshefe mir passwordin
    const passwordHash = await bcrypt.hash(request.password, 10);

    const user = new User({
      id: randomUUID(),
      email: request.email,
      fullName: request.fullName,
      passwordHash,
      tenantId: tenant.id,
    });

    const savedUser = await this.userRepo.save(user);

    const token = this.jwtService.generateToken({ userId: user.id });

    return {
      id: savedUser.id,
      email: savedUser.email,
      fullName: savedUser.fullName,
      token,
    };
  }
}
