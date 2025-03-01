"use client"
import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

interface Props {
  children: ReactNode
}

function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  )
}

export default Provider
