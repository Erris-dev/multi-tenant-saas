import jwt from "jsonwebtoken";
import { config } from "../../config";
import { TokenService } from "../../application/ports/tokenService";

export interface UserPayload {
    userId: string;
}

export class JwtService implements TokenService {
  private secret: string;

  constructor() {
    this.secret = config.jwt.secret || '';
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, this.secret) as UserPayload;
    } catch (err) {
      return null;
    }
  }
}
