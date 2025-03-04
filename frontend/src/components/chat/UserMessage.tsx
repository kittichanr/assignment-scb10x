import React from "react"

interface Props {
  message: string
}

export default function UserMessage({ message }: Props) {
  return (
    <div className="flex justify-end my-4">
      <div className="text-left text-white p-1 px-4 font-medium bg-[#1A1B1F] rounded-3xl max-w-xs break-words">
        {message}
      </div>
    </div>
  )
}
