import { llmModel } from "@/libs/constant"
import React, { createContext, useContext, useState, ReactNode } from "react"

type LlmModelContextType = {
  selectedModel: string | null
  setSelectedModel: (model: string) => void
}

const LlmModelContext = createContext<LlmModelContextType | undefined>(
  undefined
)

export const LlmModelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(
    llmModel[0].name
  )

  return (
    <LlmModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </LlmModelContext.Provider>
  )
}

export const useLlmModel = () => {
  const context = useContext(LlmModelContext)
  if (!context) {
    throw new Error("useLlmModel must be used within a LlmModelProvider")
  }
  return context
}
