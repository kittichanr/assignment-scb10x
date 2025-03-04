import { IMessage } from "@/app/types/types"
import { truncateText } from "@/libs/utils"
import { useRouter, useParams } from "next/navigation"
import React from "react"

interface Props {
  chatHistory: IMessage[]
}

export const ChatHistory = ({ chatHistory }: Props) => {
  const navigate = useRouter()
  const params = useParams<{ id: string }>()

  const onGoToSession = (sessionId: string) => {
    navigate.replace(`/c/${sessionId}`)
  }

  return (
    <div className="flex  flex-col h-[calc(100vh-180px)]">
      <div className="text-[#7C7E89]">History</div>
      <div className="flex flex-col ml-4 mt-8 overflow-y-auto scrollbar-hide hover:cursor-pointer  ">
        {chatHistory?.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-2 ${
                params.id === item.session_id ? "text-[#726BDF]" : "text-white"
              }`}
              onClick={() => onGoToSession(item.session_id)}
            >
              {truncateText(item.content, 20)}
            </div>
          )
        })}
      </div>
      <div className="flex flex-1" />
    </div>
  )
}
