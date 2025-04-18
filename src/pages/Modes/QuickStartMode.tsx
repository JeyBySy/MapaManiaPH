import React, { useState, useRef } from "react"
import { LGU_PATHS } from "../../util/constants"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { RotateCcw } from "lucide-react"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince } = useProvince(true)
  const [submitted, setSubmitted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()

  const handleSubmit = () => {
    setSubmitted(true)
    if (!isCorrect) {
      setTypedText("")
    }
  }

  const handleNextProvince = () => {
    nextProvince()
    setSubmitted(false)
    setTypedText("")
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Test sample LGU list
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
      <div className={`transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 h-full min-w-[250px] bg-gray-800 p-4 border-r-2 border-gray-600 z-50`}>
        <button onClick={toggleSidebar} className="text-white absolute right-2 top-0 text-2xl">
          x
        </button>
        <h2 className="text-xl font-bold text-green-400">Province</h2>
        <p className="text-gray-400">
          {submitted
            ? provinceOutline
            : provinceOutline.replace(/[A-Z]/gi, "*").slice(0, 6)}
        </p>
        <h3 className="mt-4 text-lg font-semibold text-green-400">LGUs</h3>
        <ul className="mt-2 text-gray-400">
          {lguList.map((lgu, index) => (
            <li key={index} className="mb-2">
              {lgu}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={toggleSidebar} className="text-white absolute text-2xl">
        Open
      </button>

      {/* Main Content */}
      <div className="container md:mx-auto lg:h-auto mt-12 flex flex-col items-center justify-center h-full w-full">
        <p className="lg:text-3xl hidden lg:block  font-bold mb-6 tracking-widest text-green-400 text-center md:text-4xl">
          Guess the Province
        </p>

        {/* Province Outline */}
        <div className="w-full md:w-4xl h-48 md:h-96 relative bg-gray-800 border-2 border-gray-600 flex items-center justify-center rounded mb-6 py-4">
          <button
            onClick={handleNextProvince}
            className="absolute w-auto text-gray-400 hover:text-gray-300 p-2 rounded cursor-pointer top-0 right-0 "
          >
            <RotateCcw width={20} height={20} />
          </button>
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
              className={`w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center text-md lg:text-xl font-bold uppercase ${char === "_"
                ? "border-transparent bg-transparent"
                : typedText[i]
                  ? "border-green-400 bg-gray-800"
                  : "border-gray-600 bg-gray-900"
                }`}
            >
              {char === "_" ? (
                <span className="w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center border-gray-600 bg-gray-700" />
              ) : (
                typedText[i] || ""
              )}
            </div>
          ))}
        </div>

        <div className="fixed w-full bottom-0 mb-2 lg:static lg:w-fit">
          <Keyboard
            value={typedText}
            onType={setTypedText}
            limit={provinceOutline.length}
            onSubmit={handleSubmit}
            provinceValue={provinceOutline}
          />
        </div>
      </div>
    </div>
  )
}

export default QuickStartMode
