import { IMessage } from "@/app/types/types"
import { apiFetch } from "@/libs/api"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"

export interface ISendMessage {
  sessionId: string
  message: string
  model: string
  maxTokens: number
  temperature: number
  topP: number
  topK: number
  repetitionPenalty: number
}

export default function useChatStream(sessionId?: string) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getChatSession = async () => {
    const result = await apiFetch(`chat/history/${sessionId}`)
    setMessages(result)
  }

  useEffect(() => {
    if (sessionId) {
      getChatSession()
    }
  }, [])

  const sendMessage = async (message: ISendMessage) => {
    setIsLoading(true)
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { id: sessionId, role: "user", content: message.message },
    ])

    const session = await getSession()
    const token = session?.accessToken

    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    })

    const reader = response.body?.getReader()
    if (!reader) return

    const decoder = new TextDecoder()

    let aiMessage = ""
    let sessionID = ""
    let likeStatus = ""
    let tokenCount = 0
    let responseTime = 0

    let messageId = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunkText = decoder.decode(value, { stream: true })
      const eventLines = chunkText.split("\n\n")

      for (const event of eventLines) {
        if (!event.startsWith("data: ")) continue

        try {
          const jsonStr = event.replace("data: ", "").trim()
          const parsedData = JSON.parse(jsonStr)

          const {
            session_id,
            role,
            like_status,
            content,
            id,
            response_time,
            token_count,
          } = parsedData

          aiMessage += content
          tokenCount = token_count
          responseTime = response_time
          sessionID = session_id
          likeStatus = like_status
          messageId = id

          setMessages((prevMessages: any) => {
            const messageExists = prevMessages.some(
              (message) => message.id === id
            )

            if (!messageExists) {
              console.log("Test1")

              return [
                ...prevMessages,
                {
                  id,
                  role: "assistant",
                  content: aiMessage,
                  session_id: sessionID,
                  like_status: likeStatus,
                  response_time: responseTime,
                  token_count: tokenCount,
                },
              ]
            } else {
              console.log("Test2")

              return prevMessages.map((msg) =>
                msg.id === id
                  ? {
                      ...msg,
                      content: aiMessage,
                      like_status,
                      role,
                      token_count: tokenCount,
                      response_time: responseTime,
                    }
                  : msg
              )
            }
          })
        } catch (error) {
          console.error("JSON parsing error:", error)
        }
      }
    }

    // const finalMessage = {
    //   id: messageId,
    //   role: "assistant",
    //   content: aiMessage,
    //   sessionId: sessionID,
    //   like_status: likeStatus,
    //   response_time: responseTime,
    //   token_count: tokenCount,
    // }

    // setMessages((prevMessages) =>
    //   prevMessages.map((msg) => {
    //     return msg.id === messageId ? finalMessage : msg
    //   })
    // )

    // setMessages((prevMessages: any) => [...prevMessages, finalMessage])

    setIsLoading(false)
  }

  const regenerateMessage = async (
    message: ISendMessage & { messageId: string }
  ) => {
    setIsLoading(true)

    const session = await getSession()
    const token = session?.accessToken

    const response = await fetch("http://localhost:3000/api/chat/regenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    })

    const reader = response.body?.getReader()
    if (!reader) return

    const decoder = new TextDecoder()

    let regeneratedMessage = ""
    let updatedTokenCount = 0
    let updatedResponseTime = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunkText = decoder.decode(value, { stream: true })
      const eventLines = chunkText.split("\n\n")

      for (const event of eventLines) {
        if (!event.startsWith("data: ")) continue

        try {
          const jsonStr = event.replace("data: ", "").trim()
          const parsedData = JSON.parse(jsonStr)

          const { content, response_time, token_count } = parsedData

          regeneratedMessage += content
          updatedTokenCount = token_count
          updatedResponseTime = response_time

          setMessages((prevMessages) =>
            prevMessages.map((msg) => {
              return msg.id === message.messageId
                ? {
                    ...msg,
                    content: regeneratedMessage,
                    token_count: updatedTokenCount,
                    response_time: updatedResponseTime,
                  }
                : msg
            })
          )
        } catch (error) {
          console.error("JSON parsing error:", error)
        }
      }
    }

    setIsLoading(false)
  }

  const likeMessage = async (
    messageId: string,
    likeStatus: "like" | "dislike"
  ) => {
    const res = await apiFetch("chat/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_id: messageId, like_status: likeStatus }),
    })
    if (res?.success) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, like_status: likeStatus } : msg
        )
      )
    }
  }

  return { messages, isLoading, sendMessage, likeMessage, regenerateMessage }
}
