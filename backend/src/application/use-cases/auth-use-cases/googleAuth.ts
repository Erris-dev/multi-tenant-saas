import { UserRepository } from "../../ports/userRepo";
import { TokenService } from "../../ports/tokenService";
import { IGoogleAuthService } from "../../ports/googleAuthServiceRepo";
import { TenantRepository } from "../../ports/tenantRepo";
import { Tenant } from "../../../domain/entities/Tenant";
import { User } from "../../../domain/entities/User";
import { randomUUID } from "crypto";

export class GoogleAuth {
  constructor(
    private googleService: IGoogleAuthService,
    private userRepo: UserRepository,
    private jwtService: TokenService,
    private tenantRepo: TenantRepository
  ) {}

  async execute(authCode: string, subdomain: string): Promise<any> {
    const googleUser = await this.googleService.getGoogleUser(authCode);
    let user = await this.userRepo.findByEmail(googleUser.email);
    let tenant = await this.tenantRepo.findBySubdomain(subdomain);

    if (!tenant) {
      tenant = new Tenant({
        id: randomUUID(),
        subdomain,
      });
      tenant = await this.tenantRepo.save(tenant);
    }

    if(!user) {
        user = new User({
            id: randomUUID(),
            email: googleUser.email,
            fullName: googleUser.name,
            tenantId: tenant.id
        })
        await this.userRepo.save(user);
    }

    const token = this.jwtService.generateToken({ userId: user.id });

    return {
        id: user.id,
        email: user.email,
        name: user.fullName,
        token
    }
  }
}
