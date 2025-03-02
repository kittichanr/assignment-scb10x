"use client"

import { signOut } from "next-auth/react"
import React, { useEffect } from "react"

export default function SignOutPage() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/sign-in" })
  }, [])

  return <div></div>
}
