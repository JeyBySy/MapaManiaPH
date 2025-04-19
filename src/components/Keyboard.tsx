import { CornerDownLeft, Delete } from "lucide-react"
import React, { useEffect } from "react"

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["backspace", "Z", "X", "C", "V", "B", "N", "M", "enter"],
]

interface KeyboardProps {
  value: string
  onType: (value: string) => void
  onSubmit: () => void
  limit?: number
  provinceValue?: string
}

const Keyboard: React.FC<KeyboardProps> = ({ value, onType, limit, onSubmit, provinceValue }) => {
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
        if (isInputValid) onSubmit()
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
    <div className="w-full max-w-2xl mx-auto px-2 relative">
      <div className="flex flex-col gap-2 ">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 lg:gap-1">
            {row.map((key) => {
              if (key === "backspace") {
                return (
                  <button
                    key={key}
                    className="bg-red-500 hover:bg-red-600 rounded text-xs text-white shadow transition-colors w-16 px-1 flex items-center justify-center"
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
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                      } rounded text-xs text-white shadow transition-colors w-16 px-1 flex items-center justify-center`}
                    onClick={(e) => {
                      (e.target as HTMLButtonElement).blur()
                      onSubmit()
                    }}
                  >
                    <CornerDownLeft stroke={isInputValid ? "white" : "gray"} />
                  </button>
                )
              }

              return (
                <button
                  key={key}
                  className="bg-gray-600 hover:bg-gray-500 rounded text-xs  text-white shadow transition-colors w-12 px-1 py-4 flex items-center justify-center"
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
    </div>
  )
}

export default Keyboard
