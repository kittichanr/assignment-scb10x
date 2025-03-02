"use client"

import { ChevronDownIcon } from "@heroicons/react/16/solid"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef?.current as any).contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const router = useRouter()
  const session = useSession()

  const onNavigate = (path: string) => {
    router.push(path)
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={`bg-[#121215] p-4 h-16 flex flex-row w-full xl:px-40`}>
      <div
        className="hidden md:flex items-center justify-center mr-4 hover:cursor-pointer"
        onClick={() => onNavigate("/")}
      >
        <Image
          alt="typhoon_logo"
          src="/images/typhoon-logo.png"
          width={120}
          height={50}
        />
      </div>
      <div className="flex flex-1 items-center justify-end relative">
        <div className="rounded-4xl border-[#726BDF] border-2 text-white p-2 px-4 font-bold">
          Docs
        </div>
        <div className="relative ml-4 flex items-center">
          <button
            className="text-white font-bold"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {session?.data?.user?.name}
          </button>
          <div className="ml-2">
            <ChevronDownIcon className="h-4 w-4 text-[#726BDF]" />
          </div>
        </div>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-6 right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
          >
            <ul>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
