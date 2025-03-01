"use client"

import React from "react"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type SignInInput = {
  name: string
  email: string
  password: string
}

export default function SignUpPage() {
  const [inputs, setInputs] = useState<SignInInput>({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const { back } = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false)
    }
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }),
      })

      if (response.ok) {
        toast.success("อีเมลถูกสร้างสำเร็จ!")
        back()
      } else {
        const errorData = await response.json()
        setError(true)
        setErrorMessage(errorData.error)
      }
    } catch (error: any) {
      console.error("Network error:", error)
      setError(true)
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name / ชื่อ
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={inputs.name}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
              value={inputs.email}
              onChange={handleChange}
              required
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
              value={inputs.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium  rounded-md shadow-sm border text-white bg-black hover:text-black hover:bg-white"
          >
            Sign Up
          </button>
          {error && (
            <p className="mt-2 text-sm text-center text-red-600">
              {errorMessage}
            </p>
          )}
        </form>
        <div className="text-sm text-center text-gray-600">
          มีบัญชีอยู่แล้ว?{" "}
          <a
            href="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ลงชื่อเข้าใช้
          </a>
        </div>
      </div>
    </div>
  )
}
