import React, { useState, useRef, useEffect } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { MapPin, RotateCcw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { useUniquePathId } from "../../hooks/useUniquePath"
import MapSVG from "../../components/MapSVG"
import { isMobile } from "react-device-detect"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince, locationName, refreshPaths } =
    useProvince(true)
  const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()
  const [currentStep, setCurrentStep] = useState(0) // track progress
  const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([])
  const [showMap, setShowMap] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const isCompleted = correctGuesses.length === locationName.length

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

    await nextProvince()

    if (provinceOutline === prevProvince) {
      refreshPaths()
    }

    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handlePathClick = (clickedId: string) => {
    const cityName = answerKeys[clickedId]

    if (!cityName) {
      console.log(`❌ ${clickedId} is not in answerKeys.`)
      return
    }

    const expectedAnswer = locationName[currentStep]

    if (
      cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()
    ) {
      setCorrectGuesses((prev) => [...prev, [cityName, clickedId]])
      setCurrentStep((prev) => prev + 1) // move to next city
    }
  }

  useEffect(() => {
    if (submitted) {
      setShowMap(false) // reset
      const timeout = setTimeout(() => setShowMap(true), 0) // simulate reload delay
      return () => clearTimeout(timeout)
    }
  }, [submitted])

  useEffect(() => {
    const currentItem = itemRefs.current[currentStep]

    if (currentItem) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [currentStep])

  useEffect(() => {
    if (nextButtonRef.current && isCompleted) {
      nextButtonRef.current.focus();
    }
  }, [isCompleted]);


  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:mt-14 lg:h-fit justify-center">
      {/* LEFT: Location List */}
      <div className={`w-full lg:w-1/5 flex-col h-[40vh] lg:h-fit  ${submitted ? 'lg:flex' : 'hidden'}`}>
        <div className="sticky top-0 z-20 bg-gradient-to-r dark:from-green-800 dark:to-green-600/50 from-green-800/80 to-green-600 text-white font-semibold p-4 rounded-t-md shadow-md">
          <p className="text-xs lg:text-sm uppercase tracking-wider">
            Guess the Location
          </p>
        </div>
        <div className="flex flex-col gap-2 h-full overflow-y-auto bg-neutral-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-b-md p-4 shadow-inner">
          {submitted && typedText.length !== 0 ? (
            locationName.map((path, index) => {
              const isCurrentStep = index === currentStep
              const isLocationCorrect = correctGuesses.some(([id]) => id === path)

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={`flex items-center gap-3 p-3 border  border-gray-300 dark:border-gray-700 rounded-md transition-all shadow text-shadow-2xs 
                  ${isCurrentStep ? " bg-neutral-50 text-gray-400 cursor-pointer dark:bg-gray-200 dark:text-gray-600 " :
                      isLocationCorrect ? "text-retro-mint-text dark:text-white bg-retro-mint dark:bg-retro-purple" :
                        "text-gray-400/20 bg-gray-300 dark:bg-gray-700/40 dark:text-gray-500"}`}
                >
                  <MapPin className={`transition-all  w-6 h-6 ${isLocationCorrect ? "dark:text-neutral-100 text-retro-mint-text" : "dark:text-neutral-600 text-gray-400"}`} />
                  <TypingText
                    text={path}
                    isSubmitted={true}
                    isMasked={false}
                    className="text-xs lg:text-sm capitalize"
                  />
                </div>
              )
            })
          ) : (
            <div className="text-center text-sm italic text-gray-400">
              <TypingText
                text={provinceOutline.toString()}
                isSubmitted={submitted}
                isMasked={true}
                className={`lg:text-sm py-4  px-2 text-xs text-shadow-xs ${!submitted
                  ? "text-gray-500/0 dark:text-white/40"
                  : "text-accent"
                  }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Map Display*/}
      <div className="w-full lg:w-2/3 px-2 overflow-hidden">
        {/* Map */}
        <div className="w-full h-[60vh] lg:h-[70vh] py-5 bg-transparent border relative border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ">
          {/* Province Name */}
          <div className="absolute left-0 top-0 z-50 py-4 px-4">
            <TypingText
              text={provinceOutline}
              isSubmitted={submitted}
              isMasked={true}
              upperCase={true}
              className={`text-sm lg:text-xl text-shadow ${submitted ? "dark:text-retro-purple text-retro-mint" : "text-white"}`}
            />
          </div>

          {/* Next Province Button */}
          <button
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement).blur()
              handleNextProvince()
            }}
            className="absolute top-1 right-1  hover:outline-1 outline-gray-500/50 w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white px-4 py-4 rounded-md cursor-pointer z-50"
          >
            <RotateCcw width={20} height={20} />
          </button>

          {/* Province Map */}
          <div className="relative w-full h-full  flex-6/12 flex items-center justify-center p-2">
            {submitted && !showMap ? (
              <ProvinceSkeleton />
            ) : (
              provinceOutline &&
              UniquePath &&
              UniquePath[provinceOutline] && (
                <MapSVG
                  provinceName={provinceOutline}
                  pathsData={UniquePath}
                  mode="guess"
                  isSubmitted={submitted}
                  correctGuesses={correctGuesses}
                  onPathClick={handlePathClick}
                />
              )
            )}
          </div>
        </div>

        {/* Typing and next province button */}
        <div className="flex flex-col w-full h-fit">
          {/* Keyboard */}
          {!submitted && (
            <div className="flex flex-col w-full items-center gap-4 p-2 relative">

              {/* Typing Squares */}
              <div className="flex flex-wrap gap-1 justify-center">
                {provinceOutline.split("").map((char, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 md:w-12 md:h-12 border-2 flex items-center justify-center text-center text-sm lg:text-lg font-bold uppercase
            ${char === "_"
                        ? "border-transparent bg-transparent"
                        : typedText[i]
                          ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                          : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                      }`}
                  >
                    {char === "_" ? (
                      <span className="w-9 h-9 md:w-12 md:h-12 border-b-2 dark:border-gray-600 border-gray-100" />
                    ) : (
                      typedText[i] || ""
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Keyboard */}
              <div
                className={`mx-auto w-full ${isMobile ? "mb-2" : "hidden"} lg:static lg:w-fit`}>
                <Keyboard
                  value={typedText}
                  onType={setTypedText}
                  limit={provinceOutline.length}
                  onSubmit={handleSubmit}
                  provinceValue={provinceOutline}
                />
              </div>
            </div>
          )}
          {/* Next Province Button */}
          {isCompleted && (
            <div className="w-full flex items-center justify-center py-4">
              <button
                ref={nextButtonRef}
                onClick={() => handleNextProvince()}
                className="cursor-pointer p-4 text-sm dark:bg-green-800 bg-green-600 w-full lg:w-fit rounded"
              >
                Next Province
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default QuickStartMode
