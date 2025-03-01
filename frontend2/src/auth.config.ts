import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const res = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          })

          const data = await res.json()

          if (!res) throw new Error(data.error || "Invalid credentials")

          return data
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
