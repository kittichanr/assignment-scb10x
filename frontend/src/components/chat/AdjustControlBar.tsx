"use client"

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import React, { useState } from "react"
import SliderControls from "./SliderControl"
import { llmModel } from "@/libs/constant"
import { useLlmModel } from "@/providers/LLMModelProvider"

export const AdjustControlBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [toggleParameter, setToggleParameter] = useState(true)

  const { selectedModel, setSelectedModel } = useLlmModel()

  const handleSelectModel = (model: string) => {
    setSelectedModel(model)
    setToggleDropdown(false)
  }

  return (
    <div className="py-12 ml-4">
      <div
        className="flex flex-row items-center mb-4 hover:cursor-pointer"
        onClick={() => setToggleParameter(!toggleParameter)}
      >
        <div className="text-white mr-2 font-semibold">Parameters</div>
        {toggleParameter ? (
          <ChevronDownIcon className="h-6 w-6 text-[#726BDF] rounded-full bg-[#121215]" />
        ) : (
          <ChevronUpIcon className="h-6 w-6 text-[#726BDF] rounded-full bg-[#121215]" />
        )}
      </div>
      {toggleParameter && <SliderControls />}
      <div>
        <div className="text-white mt-4 mr-2 font-semibold">Model</div>
        <div className="relative text-left mt-2">
          <button
            onClick={() => setToggleDropdown(!toggleDropdown)}
            className="w-full justify-between flex items-center px-4 py-2 bg-[#121215] text-white rounded-3xl"
          >
            {selectedModel}
            {toggleDropdown ? (
              <ChevronUpIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-white" />
            )}
          </button>

          {toggleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121215] text-white shadow-lg rounded-lg">
              <ul className="p-2 space-y-2">
                {llmModel.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleSelectModel(item.name)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md"
                    >
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
