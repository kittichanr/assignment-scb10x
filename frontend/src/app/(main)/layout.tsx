"use client"

import { AdjustControlBar } from "@/components/chat/AdjustControlBar"
import Navbar from "@/components/layout/Navbar"
import { LlmModelProvider } from "@/providers/LLMModelProvider"
import { SliderControlsProvider } from "@/providers/SliderControlsProvider"

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <div>
        <div className="bg-[#121215] h-[100vh] items-center py-8">
          <div className="container bg-[#1A1B1F] mx-auto max-w-screen-2xl rounded-xl  p-4">
            <div className="grid grid-cols-[4fr_1fr] gap-4 ">
              <LlmModelProvider>
                <SliderControlsProvider>
                  {children}
                  <AdjustControlBar />
                </SliderControlsProvider>
              </LlmModelProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
