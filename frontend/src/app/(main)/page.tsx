"use client"

import { Chat } from "@/components/chat/Chat"
import { useEffect, useState } from "react"
import { IMessage } from "../types/types"
import { apiFetch } from "@/libs/api"
import { ChatHistory } from "@/components/chat/ChatHistory"

export default function Home() {
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const init = async () => {
    const result = await apiFetch("chat/history", {})
    setChatHistory(result)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4 ">
      <ChatHistory chatHistory={chatHistory} />
      <Chat />
    </div>
  )
}
