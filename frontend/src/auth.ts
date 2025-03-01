import { NextAuthConfig } from "next-auth"
import nextAuth from "next-auth"

import authConfig from "./auth.config"

export const authOptions: NextAuthConfig = {
  ...authConfig,
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.access_token
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = String(token.accessToken)
        session.id = String(token.id)
        if (session.user) {
          session.user.email = String(token.email)
          session.user.id = String(token.id)
          session.user.name = String(token.name)
        }
      }
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = nextAuth(authOptions)
