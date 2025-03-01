import { auth } from "@/auth"
import { getSession } from "next-auth/react"

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  isServer?: boolean
) {
  let token: string | undefined

  if (isServer) {
    const session = await auth()

    token = session?.accessToken
  } else {
    const session = await getSession()
    token = session?.accessToken
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
    ...options,
    headers,
  })

  if (!res) {
    throw new Error(`API error: ${res}`)
  }

  return res.json()
}
