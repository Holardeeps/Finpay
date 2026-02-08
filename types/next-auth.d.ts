import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }

  interface Account {
    provider?: string;
    type?: string;
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
