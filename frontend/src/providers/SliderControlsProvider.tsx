import React, { createContext, useContext, useState, ReactNode } from "react"

type SliderControlsContextType = {
  outputLength: number
  setOutputLength: (value: number) => void
  temperature: number
  setTemperature: (value: number) => void
  topP: number
  setTopP: (value: number) => void
  topK: number
  setTopK: (value: number) => void
  repetitionPenalty: number
  setRepetitionPenalty: (value: number) => void
}

const SliderControlsContext = createContext<
  SliderControlsContextType | undefined
>(undefined)

export const SliderControlsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [outputLength, setOutputLength] = useState(150)
  const [temperature, setTemperature] = useState(0.6)
  const [topP, setTopP] = useState(0.7)
  const [topK, setTopK] = useState(50)
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.05)

  return (
    <SliderControlsContext.Provider
      value={{
        outputLength,
        setOutputLength,
        temperature,
        setTemperature,
        topP,
        setTopP,
        topK,
        setTopK,
        repetitionPenalty,
        setRepetitionPenalty,
      }}
    >
      {children}
    </SliderControlsContext.Provider>
  )
}

export const useSliderControls = () => {
  const context = useContext(SliderControlsContext)
  if (!context) {
    throw new Error(
      "useSliderControls must be used within a SliderControlsProvider"
    )
  }
  return context
}
