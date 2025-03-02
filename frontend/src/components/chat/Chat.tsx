import Image from "next/image"
import React from "react"

export const Chat = () => {
  return (
    <div className="h-full">
      <div className="text-white text-2xl mb-4">
        Chat{" "}
        <span className="text-[#7C7E89] ml-2 rounded-2xl bg-[#121215] text-sm p-2">
          model
        </span>
      </div>
      <div className="bg-[#121215] rounded-2xl h-[80%] mb-4 "></div>
      <div className="flex flex-row">
        <div className="bg-[#121215] rounded-3xl mr-2 content-center flex-1 p-2">
          <input
            className="text-white  w-full m-2 outline-0"
            type="text"
            name="message"
            placeholder="Enter text here..."
          />
        </div>
        <div className="hover:opacity-80 hover:cursor-pointer rounded-3xl p-px bg-gradient-to-r from-[#A77BE8] via-[#F0BFAA] to-[#6CA1C7]">
          <div className="bg-[#121215]  p-4 flex flex-row items-center rounded-[calc(1.5rem-1px)]">
            <Image
              src="/icons/paper-plane.png"
              width={20}
              height={20}
              alt="paper-plane-icon"
              sizes="500px"
              className="item"
            />
            <div className="ml-2 text-white font-semibold">Send</div>
          </div>
        </div>
      </div>
    </div>
  )
}
