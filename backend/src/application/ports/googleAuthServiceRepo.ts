export interface IGoogleAuthService {
    getGoogleUser(authCode: string): Promise<any>;
}