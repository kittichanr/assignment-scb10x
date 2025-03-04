"use client"

import React, { use } from "react"
import { signIn } from "next-auth/react"
import { ChangeEvent, FormEvent, useState } from "react"
import Image from "next/image"

type SignInInput = {
  email: string
  password: string
}

type PageProps = {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}

export default function SignInPage(props: PageProps) {
  const searchParams = use(props.searchParams)
  const [inputs, setInputs] = useState<SignInInput>({
    email: "",
    password: "",
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await signIn("credentials", {
      email: inputs.email,
      password: inputs.password,
      callbackUrl: searchParams.callbackUrl ?? "/",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#121215] via-[#121215] to-[#12121533]">
      <Image
        alt="typhoon_logo"
        src="/images/typhoon-logo.png"
        width={125}
        height={125}
      />
      <div className="w-full mt-8  max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign In
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email / อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              required
              value={inputs.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password / รหัสผ่าน
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              required
              value={inputs.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black hover:text-black hover:bg-white rounded-md shadow-sm hover:border-black border"
          >
            Sign In
          </button>
          {searchParams.error && (
            <p className="mt-2 text-sm text-center text-red-600">
              การลงชื่อเข้าใช้ล้มเหลว กรุณาลองอีกครั้ง
            </p>
          )}
        </form>
        <div className="text-sm text-center text-gray-600">
          {"ยังไม่มีบัญชี?"}{" "}
          <a
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ลงทะเบียน
          </a>
        </div>
      </div>
    </div>
  )
}
