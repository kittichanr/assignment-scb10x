import { IMessage } from "@/app/types/types"
import {
  ArrowPathIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid"
import Image from "next/image"
import React from "react"

interface Props {
  message: {
    id: string
    role: string
    content: string
  } & IMessage
  onLikeMessage: (messageId: string, likeStatus: "like" | "dislike") => void
  onRegenerateMessage: () => void
}

export default function AIMessage({
  message,
  onLikeMessage,
  onRegenerateMessage,
}: Props) {
  return (
    <div className="my-4 flex justify-between">
      <div>
        <div className="flex text-white">{message.content}</div>
        <div className="flex flex-row items-center mt-2">
          <HandThumbUpIcon
            className="h-5 w-5 hover:cursor-pointer"
            stroke={message.like_status === "like" ? "#726BDF" : "#7C7E89"}
            onClick={() => onLikeMessage(message.id, "like")}
          />
          <HandThumbDownIcon
            className="h-5 w-8 hover:cursor-pointer"
            stroke={message.like_status === "dislike" ? "#726BDF" : "#7C7E89"}
            onClick={() => onLikeMessage(message.id, "dislike")}
          />
          <div className="text-[#7C7E89] text-sm">
            {message.token_count} tokens | {message.response_time} tokens/s
          </div>
          <ArrowPathIcon
            className="ml-4 w-4 h-4 text-[#7C7E89] hover:cursor-pointer"
            onClick={onRegenerateMessage}
          />
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
