import React, { useState, useRef, useEffect } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { RotateCcw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { motion } from "framer-motion"
import { useUniquePathId } from "../../hooks/useUniquePath"
import MapSVG from "../../components/MapSVG"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince, locationName, refreshPaths } = useProvince(true)
  const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
  const [submitted, setSubmitted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()
  const [currentStep, setCurrentStep] = useState(0); // track progress
  const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([]);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true)
    setIsSidebarOpen(!!isSidebarOpen)
    if (!isCorrect) {
      setSubmitted(false)
      setIsSidebarOpen(true)
      setTypedText("")
    }
  }

  const handleNextProvince = async () => {
    const prevProvince = provinceOutline
    setTypedText("")
    setCurrentStep(0)
    setCorrectGuesses([])
    setIsLoading(true)
    setSubmitted(false)
    await new Promise((res) => setTimeout(res, 500))
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

    const expectedAnswer = locationName[currentStep];

    if (cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()) {
      setCorrectGuesses((prev) => [...prev, [cityName, clickedId]]);
      setCurrentStep((prev) => prev + 1); // move to next city     
    }

    if (correctGuesses.length + 1 === locationName.length) {
      console.log("🎉 All correct answers found!");
      handleNextProvince()
    }
  };

  useEffect(() => {
    if (submitted) {
      setShowMap(false); // reset
      const timeout = setTimeout(() => setShowMap(true), 1000); // simulate reload delay
      return () => clearTimeout(timeout);
    }
  }, [submitted]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`hidden lg:block transition-transform ${isSidebarOpen ? "translate-y-0" : "-translate-y-full"} fixed top-0 left-0  min-w-[250px] dark:bg-gray-800 bg-slate-200 p-3 border border-t-0 border-gray-600 shadow z-50 rounded-b-sm`}>
        <h2 className="text-md text-white bg-green-400/50 px-4 py-2 rounded rounded-b-none text-shadow-2xs">Guess the Province</h2>
        <div className="bg-slate-50 dark:bg-gray-700/50 border  border-gray-600/30 shadow">

          <TypingText
            text={provinceOutline}
            isSubmitted={submitted}
            isMasked={true}
            className={`${!submitted ? " dark:text-white/40 text-gray-500/0" : "text-accent"} p-3 text-shadow-2xs`}
          />

          {submitted && typedText.length !== 0 && (
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <hr className="text-gray-400/60" />
              <ul className=" flex flex-col gap-2 p-3 ">
                {locationName.map((path, index) => {
                  const isCurrentStep = index === currentStep;
                  const isLocationCorrect = correctGuesses.some(([id]) => id === path);
                  return (
                    <li key={index} className={`mb-2 ${isCurrentStep ? 'animate-breathing' : ''}`}>
                      <TypingText
                        text={`${path}`}
                        isSubmitted={true}
                        isMasked={false}
                        className={`text-sm ${isCurrentStep
                          ? 'dark:text-white text-gray-500 text-shadow-2xs '
                          : isLocationCorrect
                            ? ' text-accent text-shadow-2xs'
                            : 'dark:text-white/40 text-gray-500/30'
                          }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
        {/* Toggle sidenav */}
        <div onClick={toggleSidebar} className="w-[85%] mx-auto absolute -bottom-6 flex items-center justify-center">
          <div className={`${isSidebarOpen ? "dark:bg-gray-800 bg-slate-200" : "bg-white/80 dark:bg-gray-800/90 dark:hover:bg-gray-800 hover:bg-white "} border border-t-0 w-1/2 mx-auto py-[3.5px] z-30 text-xs text-center cursor-pointer rounded-b-2xl dark:text-slate-500 text-gray-600`}>
            {isSidebarOpen ?
              (
                <span>Close</span>
              ) : (
                <span>Open</span>
              )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto lg:h-auto flex flex-col items-center justify-center h-full w-full space-y-5 p-2">

        {/* Province Outline */}
        <div className={`${!submitted ? "h-96" : 'lg:h-[900px] h-96'} w-full md:w-4xl relative object-fit border-2 dark:border-gray-600 border-slate-300 rounded  py-4`}>
          <button
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement).blur()
              handleNextProvince()
            }}
            className="absolute w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white p-2 rounded cursor-pointer top-0 right-0 "
          >
            <RotateCcw width={20} height={20} />
          </button>
          {isLoading ? (
            <ProvinceSkeleton />
          ) : submitted && !showMap ? (
            <ProvinceSkeleton />
          ) : provinceOutline && UniquePath && UniquePath[provinceOutline] ? (
            <MapSVG
              provinceName={provinceOutline}
              pathsData={UniquePath}
              mode="guess"
              isSubmitted={submitted}
              correctGuesses={correctGuesses}
              onPathClick={handlePathClick}
            />
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
                  className={`w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center text-md lg:text-xl font-bold uppercase  ${char === "_"
                    ? "border-transparent bg-transparent"
                    : typedText[i]
                      ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                      : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                    }`}
                >
                  {char === "_" ? (
                    <span className="w-12 h-12 md:w-16 md:h-16 border-b-2 flex items-center justify-center dark:border-gray-600 border-gray-100" />
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
