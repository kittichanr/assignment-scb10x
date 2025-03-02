import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
import React from "react"

export default function AIMessage() {
  return (
    <div className="my-4 flex justify-between">
      <div>
        <div className="flex text-white">
          Hello! How can I assist you with your programming or AI related
          questions today?
        </div>
        <div className="flex flex-row items-center mt-2">
          <HandThumbUpIcon
            className="h-5 w-5 hover:cursor-pointer"
            stroke="#726BDF"
          />
          <HandThumbDownIcon
            className="h-5 w-8 hover:cursor-pointer"
            stroke="#7C7E89"
          />
          <div className="text-[#7C7E89] text-sm">
            18 tokens | 54.05 tokens/s
          </div>
        </div>
      </div>
      <div className="flex justify-end w-[20%] h-fit hover:cursor-pointer">
        <Image
          src="/icons/clipboard.png"
          width={20}
          height={20}
          alt="clip-board-icon"
          sizes="500px"
          className="item"
        />
      </div>
    </div>
  )
}
