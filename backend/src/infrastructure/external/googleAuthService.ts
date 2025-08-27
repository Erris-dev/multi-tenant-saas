import { IGoogleAuthService } from "../../application/ports/googleAuthServiceRepo";
import { OAuth2Client } from "google-auth-library";
import { config } from "../../config";

const CLIENT_ID = config.google.clientId;

export class GoogleAuthService implements IGoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(CLIENT_ID);
  }

  async getGoogleUser(authCode: string): Promise<any> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: JSON.stringify({
        code: authCode,
        client_id: CLIENT_ID,
        client_secret: config.google.clientSecret,
        redirect_uri: config.google.redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    function isTokenData(data: any): data is { id_token: string } {
      return typeof data.id_token === "string";
    }

    const data = await response.json();

    if (isTokenData(data)) {
      const userInfo = await this.verifyIdToken(data.id_token);
      return userInfo;
    } else {
      throw new Error("Invalid response from Google API");
    }
  }

  private async verifyIdToken(idToken: string): Promise<any> {
    const ticket = await this.client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });

    const payLoad = ticket.getPayload();
    console.log("ID Token payload:", payLoad);
    if (!payLoad || !payLoad.email) {
      throw new Error("Could not get user info from ID Token");
    }

    return {
      email: payLoad.email,
      name: payLoad.name,
    };
  }
}
