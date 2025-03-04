"use client"

import Image from "next/image"
import React, { useState } from "react"
import UserMessage from "./UserMessage"
import AIMessage from "./AIMessage"
import { useLlmModel } from "@/providers/LLMModelProvider"
import { useSliderControls } from "@/providers/SliderControlsProvider"

import useChatStream from "@/hooks/useChatStream"
import { useRouter } from "next/navigation"
import { IMessage } from "@/app/types/types"

const newSessionId = crypto.randomUUID()

interface Props {
  sessionId?: string
}

export const Chat = ({ sessionId }: Props) => {
  const { selectedModel } = useLlmModel()
  const { outputLength, temperature, topP, topK, repetitionPenalty } =
    useSliderControls()
  const { messages, isLoading, sendMessage, likeMessage, regenerateMessage } =
    useChatStream(sessionId)

  const [input, setInput] = useState("")

  const navigate = useRouter()

  const onSendMessage = async () => {
    if (isLoading) return
    await sendMessage({
      sessionId: sessionId ? sessionId : newSessionId,
      message: input,
      model: selectedModel as string,
      maxTokens: outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
    })
    setInput("")

    if (!sessionId) {
      navigate.replace(`/c/${newSessionId}`)
    }
  }

  const onLikeMessage = async (
    messageId: string,
    likeStatus: "like" | "dislike"
  ) => {
    await likeMessage(messageId, likeStatus)
  }

  const onRegenerateMessage = async (
    message: IMessage,
    assistantMessageId: string
  ) => {
    await regenerateMessage({
      sessionId: sessionId ? sessionId : newSessionId,
      messageId: assistantMessageId,
      message: message.content,
      model: selectedModel as string,
      maxTokens: outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
    })
  }

  return (
    <div className=" h-[calc(100vh-180px)] flex flex-col">
      <div className="text-white text-2xl mb-4">
        Chat{" "}
        <span className="text-[#7C7E89] ml-2 rounded-2xl bg-[#121215] text-sm p-2">
          {selectedModel}
        </span>
      </div>

      <div className="bg-[#121215] rounded-2xl flex-1 overflow-y-auto scrollbar-hide p-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.role === "user" ? (
              <UserMessage message={msg.content} />
            ) : (
              <AIMessage
                message={msg}
                onLikeMessage={onLikeMessage}
                onRegenerateMessage={() =>
                  onRegenerateMessage(messages[idx - 1], msg.id)
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row">
        <div className="bg-[#121215] rounded-3xl mr-2 content-center flex-1 p-2">
          <input
            className="text-white  w-full m-2 outline-0"
            type="text"
            name="message"
            placeholder="Enter text here..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                onSendMessage()
              }
            }}
          />
        </div>
        <div
          className="hover:opacity-80 hover:cursor-pointer rounded-3xl p-px bg-gradient-to-r from-[#A77BE8] via-[#F0BFAA] to-[#6CA1C7]"
          onClick={onSendMessage}
        >
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
