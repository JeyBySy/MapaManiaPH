import { CornerDownLeft, Delete } from "lucide-react"
import React, { useEffect } from "react"


const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["enter", "Z", "X", "C", "V", "B", "N", "M", "backspace"],
]

interface KeyboardProps {
  value: string
  onType: (value: string) => void
  onSubmit: () => void
  limit?: number
  provinceValue?: string,
  isLoading?: boolean
}

const Keyboard: React.FC<KeyboardProps> = ({ value, onType, limit, onSubmit, provinceValue, isLoading = true }) => {
  const handleKeyClick = (key: string) => {
    if (key.length !== 1 || !/^[a-z]$/i.test(key)) return
    if (provinceValue) {
      let newValue = value
      let nextIndex = newValue.length

      // Auto-skip underscores from provinceValue
      while (provinceValue[nextIndex] === "_") {
        newValue += "_"
        nextIndex++
      }

      // Now add the typed character
      if (!limit || newValue.length < limit) {
        newValue += key.toUpperCase() // or keep lowercase depending on your logic
        onType(newValue)
      }
    } else {
      // Default behavior
      if (!limit || value.length < limit) {
        onType(value + key.toUpperCase())
      }
    }
  }

  const handleBackspace = () => {
    if (!provinceValue) {
      onType(value.slice(0, -1))
      return
    }

    let newValue = value
    let nextIndex = newValue.length - 1

    // Skip over underscores
    while (nextIndex >= 0 && provinceValue[nextIndex] === "_") {
      nextIndex--
      newValue = newValue.slice(0, -1) // remove the underscore
    }

    // Remove the actual letter
    if (nextIndex >= 0) {
      newValue = newValue.slice(0, -1)
    }

    onType(newValue)
  }

  const isInputValid = value && value.length === provinceValue?.length


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      if (key === "enter") {
        if (isInputValid) {
          onSubmit()
        }
      } else if (key === "backspace") {
        handleBackspace()
      } else if (/^[a-z]$/.test(key)) {
        handleKeyClick(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit, provinceValue])


  return (
    <div className="w-full gap-2 mb-2 flex flex-col lg:w-fit container mx-auto relative bg-retro-main dark:bg-retro-bg">
      {isLoading && (
        <>
          <div className="flex items-center flex-wrap gap-1 justify-center ">
            {provinceValue && provinceValue.split("").map((char, i) => (
              <div
                key={i}
                className={`w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center text-center text-sm lg:text-lg font-bold uppercase
                      ${char === "_"
                    ? "border-transparent bg-transparent"
                    : value[i]
                      ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                      : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                  }`}
              >
                {char === "_" ? (
                  <span className="w-10 h-10 md:w-12 md:h-12 border-b-2 dark:border-gray-600 border-gray-100 " />
                ) : (
                  value[i] || ""
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 lg:hidden">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key) => {
                  if (key === "backspace") {
                    return (
                      <button
                        key={key}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-500/60 dark:hover:bg-red-500 rounded text-xs text-white shadow transition-colors w-fit px-3.5 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          (e.target as HTMLButtonElement).blur()
                          handleBackspace()
                        }}
                      >
                        <Delete />
                      </button>
                    )
                  }

                  if (key === "enter") {
                    return (
                      <button
                        disabled={!isInputValid}
                        key={key}
                        className={`${isInputValid
                          ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500/60 dark:hover:bg-blue-500"
                          : "bg-gray-300 dark:bg-slate-600/50 cursor-not-allowed"
                          } rounded text-xs text-white shadow transition-colors w-fit px-3.5 flex items-center justify-center cursor-pointer`}
                        onClick={(e) => {
                          (e.target as HTMLButtonElement).blur()
                          onSubmit()
                        }}
                      >
                        <CornerDownLeft className={`${isInputValid ? 'text-white/80 dark:text-white' : 'text-white dark:text-white/20'}  `} />
                      </button>
                    )
                  }

                  return (
                    <button
                      key={key}
                      className="bg-white lg:text-[100%] text-[55%] hover:bg-white/80 dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-white rounded text-xs dark:text-white/80 text-slate-600 text-shadow hover:text-slate-800 shadow transition-colors w-fit px-[3.2%] md:px-3 py-5 flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        (e.target as HTMLButtonElement).blur()
                        handleKeyClick(key.toLowerCase())
                      }}
                    >
                      {key}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default Keyboard
