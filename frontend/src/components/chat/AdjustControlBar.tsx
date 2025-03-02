"use client"

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import React, { useState } from "react"
import SliderControls from "./SliderControl"

export const AdjustControlBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return (
    <div className="py-12 ml-4">
      <div className="flex flex-row items-center mb-4">
        <div className="text-white mr-2 font-semibold">Parameters</div>
        <ChevronDownIcon className="h-6 w-6 text-[#726BDF] rounded-full bg-[#121215]" />
      </div>
      <SliderControls />
      <div>
        <div className="text-white mt-4 mr-2 font-semibold">Model</div>
        <div className="relative text-left mt-2">
          <button
            onClick={() => setToggleDropdown(!toggleDropdown)}
            className="w-full justify-between flex items-center px-4 py-2 bg-[#121215] text-white rounded-3xl"
          >
            Options
            {toggleDropdown ? (
              <ChevronUpIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-white" />
            )}
          </button>

          {toggleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121215] text-white shadow-lg rounded-lg">
              <ul className="p-2 space-y-2">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
                  Option 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
                  Option 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
                  Option 3
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
