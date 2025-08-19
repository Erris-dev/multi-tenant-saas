import { UserRepository } from "../../ports/userRepo";
import { TokenService } from "../../ports/tokenService";
import { LoginUserRequest, LoginUserResponse } from "../../dto/authDTO";

export class LoginUser {
    constructor(
        private userRepo: UserRepository,
        private jwtService: TokenService
    ) {}

    async execute(request: LoginUserRequest): Promise<LoginUserResponse> {

        const user = await this.userRepo.findByEmail(request.email);
        if(!user) {
            throw new Error("Nuk eshte i regjistrun broja");
        }

        const verified = await user.checkPassword(request.password);
        if(!verified){
            throw new Error("Passwordi eshte gabim bro bro");
        }

        const token = this.jwtService.generateToken({ userId: user.id });

        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            token
        };
        
    }
}