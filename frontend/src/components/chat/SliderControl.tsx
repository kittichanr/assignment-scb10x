"use client"
import { useSliderControls } from "@/providers/SliderControlsProvider"

export default function SliderControls() {
  const {
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
  } = useSliderControls()

  return (
    <div className="  text-white rounded-lg shadow-md space-y-4">
      {/* Output Length */}
      <div>
        <label className="text-[#7C7E89] text-sm items-center flex mb-2 ">
          Output Length{" "}
          <span className="bg-[#121215] ml-2 text-white px-2  rounded">
            {outputLength}
          </span>
        </label>
        <input
          type="range"
          min="150"
          max="8192"
          value={outputLength}
          onChange={(e) => setOutputLength(Number(e.target.value))}
          className="w-full accent-[#726BDF] bg-[#121215]"
        />
      </div>

      {/* Temperature */}
      <div>
        <label className="text-[#7C7E89] text-sm items-center flex mb-2">
          Temperature{" "}
          <span className="bg-[#121215] ml-2 text-white px-2  rounded">
            {temperature}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full accent-[#726BDF]"
        />
      </div>

      {/* Top-P */}
      <div>
        <label className="text-[#7C7E89] text-sm items-center flex mb-2">
          Top-P{" "}
          <span className="bg-[#121215] ml-2 text-white px-2  rounded">
            {topP}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={topP}
          onChange={(e) => setTopP(Number(e.target.value))}
          className="w-full accent-[#726BDF]"
        />
      </div>

      {/* Top-K */}
      <div>
        <label className="text-[#7C7E89] text-sm items-center flex mb-2">
          Top-K{" "}
          <span className="bg-[#121215] ml-2 text-white px-2  rounded">
            {topK}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={topK}
          onChange={(e) => setTopK(Number(e.target.value))}
          className="w-full accent-[#726BDF]"
        />
      </div>

      {/* Repetition Penalty */}
      <div>
        <label className="text-[#7C7E89] text-sm items-center flex mb-2">
          Repetition Penalty{" "}
          <span className="bg-[#121215] ml-2 text-white px-2  rounded">
            {repetitionPenalty}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={repetitionPenalty}
          onChange={(e) => setRepetitionPenalty(Number(e.target.value))}
          className="w-full accent-[#726BDF]"
        />
      </div>
    </div>
  )
}
