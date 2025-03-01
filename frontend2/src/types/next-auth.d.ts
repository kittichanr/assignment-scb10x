import type { DefaultSession } from "next-auth"

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    accessToken: string
    user: {
      id: string
      email: string
    }
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
    accessToken: string
    id: string
  }
}
