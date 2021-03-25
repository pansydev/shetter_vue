import { TokenPair, TokenPayload } from "@shetter/models";
import { DateTime } from "luxon";

interface Authenticated extends TokenManager {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export class TokenManager {
  private tokens?: TokenPair;
  private tokenPayload?: TokenPayload;

  load() {
    const serializedTokens = localStorage.getItem("tokens");

    if (serializedTokens) {
      this.tokens = JSON.parse(serializedTokens) as TokenPair;
      this.tokenPayload = this.extractTokenPayload(this.tokens.accessToken);
    }
  }

  extractTokenPayload(accessToken: string): TokenPayload {
    const payload = JSON.parse(window.atob(accessToken.split(".")[1]));
    payload.exp = DateTime.fromSeconds(payload.exp, { setZone: false });
    return payload;
  }

  setTokens(tokens: TokenPair) {
    this.tokens = tokens;
    this.tokenPayload = this.extractTokenPayload(this.tokens.accessToken);

    localStorage.setItem("tokens", JSON.stringify(tokens));
  }

  clearTokens() {
    this.tokens = undefined;

    localStorage.removeItem("tokens");
  }

  get accessToken(): string | undefined {
    return this.tokens?.accessToken;
  }

  get refreshToken(): string | undefined {
    return this.tokens?.refreshToken;
  }

  get username(): string | undefined {
    return this.tokenPayload?.username;
  }

  authenticated(): this is Authenticated {
    return !!this.tokens;
  }

  get expired(): boolean {
    if (!this.tokenPayload) {
      return true;
    }

    return DateTime.now() > this.tokenPayload.exp;
  }
}

export const tokenManager = new TokenManager();
