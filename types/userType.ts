import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      organizationId: string;
      needsOnboarding?: boolean;
      mobileNumber?: string;
    } & DefaultSession["user"]
  }
}