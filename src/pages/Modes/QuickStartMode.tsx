import React, { useState, useRef } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { RotateCcw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { motion } from "framer-motion"
import { useUniquePathId } from "../../hooks/useUniquePath"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince, locationPath, refreshPaths } = useProvince(true)
  const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
  const [submitted, setSubmitted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()
  const [currentStep, setCurrentStep] = useState(0); // track progress
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

  const handleSubmit = () => {
    setSubmitted(true)
    setIsSidebarOpen(true)
    if (!isCorrect) {
      setSubmitted(false)
      setTypedText("")
    }
  }

  const handleNextProvince = async () => {
    setTypedText("")
    setCurrentStep(0)
    setCorrectGuesses([])
    setIsLoading(true)
    setSubmitted(false)
    await new Promise((res) => setTimeout(res, 500))
    const prevProvince = provinceOutline
    nextProvince()
    if (provinceOutline === prevProvince) {
      refreshPaths()
    }
    setIsLoading(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePathClick = (clickedId: string) => {
    const cityName = answerKeys[clickedId];

    if (!cityName) {
      console.log(`❌ ${clickedId} is not in answerKeys.`);
      return;
    }

    const expectedAnswer = locationPath[currentStep]?.id;
    if (cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()) {
      setCorrectGuesses((prev) => [...prev, cityName]);
      setCurrentStep((prev) => prev + 1); // move to next city     
    }

    if (correctGuesses.length + 1 === locationPath.length) {
      console.log(locationPath);

      console.log("🎉 All correct answers found!");
      handleNextProvince()
    }


  };


  return (
    <div className="flex min-h-screen bg-retro-bg text-white p-4">

      {/* Sidebar */}
      <div className={`transition-transform ${isSidebarOpen ? "translate-y-0" : "-translate-y-full"} fixed top-0 left-0 space-y-3.5 min-w-[250px] bg-gray-800 p-4 border border-t-0 border-gray-600 shadow-lg z-50 rounded-b-2xl`}>
        <button onClick={toggleSidebar} className="text-white absolute right-2 top-0 text-2xl"> x </button>
        <h2 className="text-md text-white bg-green-400/50 px-4 py-2 rounded text-shadow-2xs">Guess the Province</h2>
        <TypingText
          text={provinceOutline}
          isSubmitted={submitted}
          isMasked={true}
          className={`${!submitted ? "text-gray-500" : "text-retro-mint"} text-shadow-2xs`}
        />
        {submitted && typedText.length !== 0 && (
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-md text-white bg-green-400/50 px-4 py-2 rounded text-shadow-2xs">Guess the Location</h3>
            <ul className="mt-4 text-gray-400 flex flex-col gap-1">
              {locationPath.map((path, index) => {
                const isCurrentStep = index === currentStep;
                const isCorrect = path.id && correctGuesses.includes(path.id);

                return (
                  <li key={index} className="mb-2">
                    <TypingText
                      text={`${path.id}`}
                      isSubmitted={true}
                      isMasked={false}
                      className={`text-sm ${isCurrentStep
                        ? 'text-white'
                        : isCorrect
                          ? 'text-retro-mint'
                          : 'text-gray-500'
                        }`}
                    />
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}

      </div>

      <button onClick={toggleSidebar} className="text-white absolute text-2xl">
        Open
      </button>

      {/* Main Content */}
      <div className="container md:mx-auto lg:h-auto flex flex-col items-center justify-center h-full w-full space-y-5">
        {/* Province Outline */}
        <div className={`${!submitted ? "h-96" : 'h-[900px]'} w-full md:w-4xl relative bg-gray-800 border-2 border-gray-600 flex items-center justify-center rounded  py-4`}>
          <button
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement).blur()
              handleNextProvince()
            }}
            className="absolute w-auto text-gray-400 hover:text-gray-300 p-2 rounded cursor-pointer top-0 right-0 "
          >
            <RotateCcw width={20} height={20} />
          </button>
          {isLoading ? (
            <ProvinceSkeleton />
          ) : provinceOutline && UniquePath && UniquePath[provinceOutline] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${!submitted ? "pointer-events-none" : 'pointer-events-auto'} w-full h-full `}
              viewBox={UniquePath[provinceOutline]?.viewBox || "0 0 100 100"}
            >
              {UniquePath[provinceOutline]?.paths.map((path, index) => (
                <path
                  key={path.id || index}
                  id={path.id || undefined}
                  d={path.d}
                  fill="auto"
                  className={`transition-colors duration-200 cursor-pointer 
                     ${path.id && correctGuesses.includes(path.id) ? 'fill-retro-mint' : 'hover:fill-retro-mint'}
                  `}
                  stroke="white"
                  onClick={(e) => {
                    e.preventDefault()
                    if (path.id) {
                      handlePathClick(path.id);
                    }
                  }}
                />
              ))}
            </svg>
          ) : (
            <ProvinceSkeleton />
          )}

        </div>

        {!submitted && (
          <>
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
          </>
        )}
      </div>
    </div >
  )
}

export default QuickStartMode
