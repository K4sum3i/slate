import type { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExendedUser = DefaultSession["user"] & {
  role: UserRole;
  username?: String | undefined;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  limitLinks: number;
  blocked: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      username: string | undefined;
      limitLinks: number;
    } & DefaultSession["user"];
  }
}
