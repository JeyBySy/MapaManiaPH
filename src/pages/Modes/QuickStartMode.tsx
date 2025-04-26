import React, { useState, useRef, useEffect } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { RotateCcw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { motion } from "framer-motion"
import { useUniquePathId } from "../../hooks/useUniquePath"
import MapSVG from "../../components/MapSVG"
import Footer from "../../components/Footer"
import { isMobile } from "react-device-detect"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince, locationName, refreshPaths } = useProvince(true)
  const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()
  const [currentStep, setCurrentStep] = useState(0); // track progress
  const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([]);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true)
    if (!isCorrect) {
      setSubmitted(false)
      setTypedText("")
    }
  }

  const handleNextProvince = async () => {
    const prevProvince = provinceOutline
    setTypedText("")
    setCurrentStep(0)
    setCorrectGuesses([])
    setSubmitted(false)

    await nextProvince();

    if (provinceOutline === prevProvince) {
      refreshPaths()
    }


    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
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
      const timeout = setTimeout(() => setShowMap(true), 0); // simulate reload delay
      return () => clearTimeout(timeout);
    }
  }, [submitted]);

  return (
    <div className="flex min-h-screen w-full">
      <main className="w-full lg:container flex flex-col mx-auto lg:pt-14 ">
        <div className="flex flex-col-reverse lg:flex-row w-full h-full">

          {/* Sidebar (Location List) */}
          <div className="w-full lg:w-fit lg:h-fit border-gray-300 dark:border-gray-700 p-4 bg-slate-200 dark:bg-gray-800 lg:border-4">
            <h2 className="text-md text-white bg-green-400/50 px-4 py-2 rounded-t-md text-shadow-2xs">
              Guess the Province
            </h2>

            <div className="bg-slate-50 dark:bg-gray-700/50 border border-gray-600/30 shadow">
              <TypingText
                text={provinceOutline.toString()}
                isSubmitted={submitted}
                isMasked={true}
                className={`p-3 text-lg text-shadow-xs ${!submitted
                  ? 'text-gray-500/0 dark:text-white/40'
                  : 'text-accent'
                  }`}
              />

              {submitted && typedText.length !== 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <hr className="text-gray-400/60" />
                  <ul className="flex flex-col gap-2 p-3">
                    {locationName.map((path, index) => {
                      const isCurrentStep = index === currentStep;
                      const isLocationCorrect = correctGuesses.some(([id]) => id === path);
                      return (
                        <li key={index} className={`mb-2 ${isCurrentStep ? 'animate-breathing' : ''}`}>
                          <TypingText
                            text={path}
                            isSubmitted={true}
                            isMasked={false}
                            className={`lg:text-sm text-xs  text-shadow-xs ${isCurrentStep
                              ? 'text-gray-500 dark:text-white'
                              : isLocationCorrect
                                ? 'text-accent'
                                : 'text-gray-500/30 dark:text-white/40'
                              }`}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Main Content (Map and Typing Area) */}
          <div className="flex flex-col w-full h-full space-y-5 px-3">
            {/* Province Outline */}
            <div className={`${!submitted ? "h-[50vh] lg:h-[75vh]" : "h-[50vh] lg:h-[80vh]"} w-full relative border-2 dark:border-gray-600 border-slate-300 rounded lg:py-4`}>
              <button
                onClick={(e) => {
                  (e.currentTarget as HTMLButtonElement).blur();
                  handleNextProvince();
                }}
                className="absolute w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white p-2 rounded cursor-pointer top-0 right-0"
              >
                <RotateCcw width={20} height={20} />
              </button>

              {submitted && !showMap ? (
                <ProvinceSkeleton />
              ) : provinceOutline && UniquePath && UniquePath[provinceOutline] && (
                <MapSVG
                  provinceName={provinceOutline}
                  pathsData={UniquePath}
                  mode="guess"
                  isSubmitted={submitted}
                  correctGuesses={correctGuesses}
                  onPathClick={handlePathClick}
                />
              )}
            </div>

            {/* Typing section */}
            {!submitted && (
              <>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {provinceOutline.split("").map((char, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 md:w-16 md:h-16 border-2 flex items-center justify-center text-sm lg:text-xl font-bold uppercase
                ${char === "_"
                          ? "border-transparent bg-transparent"
                          : typedText[i]
                            ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                            : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                        }`}
                    >
                      {char === "_" ? (
                        <span className="w-9 h-9 md:w-16 md:h-16 border-b-2 lg:flex items-center justify-center text-sm dark:border-gray-600 border-gray-100" />
                      ) : (
                        typedText[i] || ""
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Keyboard at bottom */}
                <div className={` ${!isMobile ? "hidden" : "fixed"} mx-auto bottom-0 right-0 left-0 w-full mb-2 lg:static lg:w-fit`}>
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
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuickStartMode
