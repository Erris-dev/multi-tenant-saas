export interface TokenService {
  generateToken(payload: object): string;
  verifyToken(token: string): object | null;
}
