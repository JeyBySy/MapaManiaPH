import React, { useState, useRef } from "react"
import { LGU_PATHS } from "../../util/constants"
import { useProvince } from "../../hooks/useProvince"

const QuickStartMode = () => {
  const { provinceOutline, nextProvince } = useProvince(true)
  const [guess, setGuess] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleNextProvince = () => {
    nextProvince()
    setGuess("")
    setSubmitted(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const lguList = [
    "LGU 1",
    "LGU 2",
    "LGU 3",
    "LGU 4",
    "LGU 5",
    "LGU 6",
    "LGU 7",
    "LGU 8",
    "LGU 9",
    "LGU 10",
  ]

  return (
    <div className="flex min-h-screen bg-retro-bg text-white p-4">
      {/* Sidebar */}
      <div
        className={`transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 border-r-2 border-gray-600 z-50`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white absolute  text-2xl"
        >
          x
        </button>
        <h2 className="text-xl font-bold text-green-400">Province</h2>
        <p className="text-gray-400">{provinceOutline}</p>
        <h3 className="mt-4 text-lg font-semibold text-green-400">LGUs</h3>
        <ul className="mt-2 text-gray-400">
          {lguList.map((lgu, index) => (
            <li key={index} className="mb-2">
              {lgu}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleSidebar} className="text-white absolute  text-2xl">
        x
      </button>

      {/* Main Content */}
      <div className="mx-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 tracking-widest text-green-400 text-center md:text-4xl">
          Guess the Province
        </h1>

        {/* Province Outline */}
        <div className="w-full md:w-4xl h-48 md:h-96 relative bg-gray-800 border-2 border-gray-600 flex items-center justify-center rounded mb-6">
          {provinceOutline && LGU_PATHS[provinceOutline] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              viewBox={LGU_PATHS[provinceOutline]?.viewBox || "0 0 100 100"}
            >
              {LGU_PATHS[provinceOutline]?.paths.map((path, index) => (
                <path
                  key={path.id || index}
                  id={path.id || undefined}
                  d={path.d}
                  fill="auto"
                  className="hover:fill-[#00FF00] transition-colors duration-200 cursor-pointer"
                  stroke="white"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(`Clicked on ${path.id || index}`)
                  }}
                />
              ))}
            </svg>
          ) : (
            `${provinceOutline} was not found in LGU_PATHS`
          )}
        </div>

        <div className="flex gap-2 mb-4 flex-wrap justify-center">
          {provinceOutline.split("").map((char, i) => (
            <div
              key={i}
              className={`w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center text-2xl font-bold uppercase ${
                char === "_"
                  ? "border-transparent bg-transparent"
                  : guess[i]
                  ? "border-green-400 bg-gray-800"
                  : "border-gray-600 bg-gray-900"
              }`}
            >
              {char === "_" ? (
                <span className="w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center border-gray-600 bg-gray-700" />
              ) : (
                guess[i] || ""
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className="w-full md:w-fit bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white text-center uppercase tracking-widest mb-4"
          placeholder="Type province name"
          maxLength={provinceOutline.length}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded border shadow-md uppercase font-bold"
          >
            Submit
          </button>

          <button
            onClick={handleNextProvince}
            className="w-full md:w-auto mt-4 bg-retro-orange hover:opacity-[2] px-6 py-2 rounded border shadow-md capitalize font-bold"
          >
            Pass
          </button>
        </div>

        {/* Feedback */}
        {submitted && (
          <p className="mt-4 text-sm text-gray-400">
            {guess.toLowerCase() ===
            provinceOutline.replace(/_/g, " ").toLowerCase()
              ? "🎉 Correct!"
              : "❌ Try again"}
          </p>
        )}
      </div>
    </div>
  )
}

export default QuickStartMode
