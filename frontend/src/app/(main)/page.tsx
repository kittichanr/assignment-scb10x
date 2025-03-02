import { AdjustControlBar } from "@/components/chat/AdjustControlBar"
import { Chat } from "@/components/chat/Chat"
import { ChatHistory } from "@/components/chat/ChatHistory"
import { apiFetch } from "@/libs/api"

export default async function Home() {
  const updatedProfile = await apiFetch("chat", {}, true)
  console.log("Updated Profile:", updatedProfile)

  return (
    <div className="bg-[#121215] h-[100vh] items-center py-8">
      <div className="container bg-[#1A1B1F] mx-auto max-w-screen-2xl rounded-xl h-[90%] p-4">
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 h-full">
          <ChatHistory />
          <Chat />
          <AdjustControlBar />
        </div>
      </div>
    </div>
  )
}
