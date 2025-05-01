import React, { useState, useRef, useEffect } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { ChevronDown, MapPin, RotateCw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { useUniquePathId } from "../../hooks/useUniquePath"
import MapSVG from "../../components/MapSVG"
import { isMobile } from "react-device-detect"
import { AnimatePresence, motion } from "framer-motion"

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
  const [isSpinning, setIsSpinning] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    if (!isCorrect) {
      setSubmitted(false)
      setTypedText("")
    }
  }

  const handleNextProvince = async () => {
    setIsSpinning(true)
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

    setTimeout(() => {
      setIsSpinning(false)
    }, 900)
  }

  const handlePathClick = (clickedId: string) => {
    const cityName = answerKeys[clickedId]

    if (!cityName) {
      console.log(`❌ ${clickedId} is not in answerKeys.`)
      return
    }

    const expectedAnswer = locationName[currentStep]

    if (cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()) {
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
    <div className="lg:flex lg:flex-row gap-1 lg:h-fit justify-center lg:container lg:mx-auto">
      {/* LEFT: Location List */}
      <div className={`w-full fixed bottom-0 lg:static lg:w-4/12 flex-col lg:h-[80vh] z-50 ${submitted ? 'lg:flex' : 'hidden'}`}>
        <div className="bg-gradient-to-r dark:from-green-800 dark:to-green-600 from-green-800 to-green-600 text-white font-semibold shadow-md rounded-t-md flex justify-between items-center z-40">
          <p className="text-xs lg:text-sm hidden lg:block uppercase tracking-wider p-4">
            Guess the Location
          </p>
          <div className="text-xs lg:text-sm uppercase tracking-wider pl-3 lg:hidden">
            {locationName[currentStep] === undefined ? (
              "Complete"
            ) : (
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`location-${currentStep}`}
                    className="text-base capitalize flex gap-1 "
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.2
                    }}
                  >
                    <MapPin className={`transition-all  w-6 h-6 text-neutral-100`} />
                    {locationName[currentStep]}
                  </motion.p>
                </AnimatePresence>
              </div>

            )}
          </div>
          <button
            title="Show All"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-4 text-white hover:text-gray-300 transition-transform cursor-pointer rounded lg:hidden"
          >
            <ChevronDown className={`w-6 h-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out flex flex-col gap-2 lg:max-h-none lg:h-full lg:p-2 border overflow-hidden  bg-neutral-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-inner 
            ${isCollapsed
            ? 'max-h-0 p-0'
            : 'max-h-[30dvh] p-2 overflow-y-auto lg:max-h-none'}`
        }>

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
                  className={`z-40 flex  items-center gap-3 p-2 lg:p-3 border  border-gray-300 dark:border-gray-700 rounded-md transition-all shadow text-shadow-2xs 
                  ${isCurrentStep ? " bg-neutral-50 text-gray-400 cursor-pointer dark:bg-gray-200 dark:text-gray-600 " :
                      isLocationCorrect ? "text-retro-mint-text dark:text-white bg-retro-mint dark:bg-retro-purple" :
                        "text-gray-400/20 bg-gray-300 dark:bg-gray-700/40 dark:text-gray-500"}`}
                >
                  <MapPin className={`transition-all  w-6 h-6 ${isLocationCorrect ? "dark:text-neutral-200 text-retro-mint-text" : "dark:text-neutral-600 text-gray-400"}`} />
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
      <div className="grid grid-rows-[1fr_auto] lg:block lg:grid-rows-none h-fit w-full px-2 lg:w-12/12 lg:h-auto mx-auto overflow-hidden relative ">
        {/* Map */}
        <div className={`w-full mx-auto ${submitted ? 'h-[85vh]' : 'h-[70vh]'} relative lg:h-[80vh] bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-30`}>
          {/* Province Name */}
          <div className="absolute left-0 top-0 z-10 py-4 px-4">
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
            title="Change Province"
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement).blur()
              handleNextProvince()
            }}
            className={`z-40 absolute top-1 right-1  hover:outline-1 outline-gray-500/50 w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white px-4 py-4 rounded-md cursor-pointer 
              ${isSpinning ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
            <RotateCw width={20} height={20} className={isSpinning ? 'animate-[spin_0.5s_linear]' : ''} />
          </button>

          {/* Province Map */}
          <div className="relative w-full h-full flex py-2 items-center justify-center z-20">
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
                  isZoomable={true}
                />
              )
            )}
          </div>
        </div>

        {/* Typing and next province button */}
        <div className="flex flex-col  justify-end mx-auto items-center w-full">
          {/* Keyboard */}
          {!submitted && (
            <>
              {/* Typing Squares */}
              <div className="flex items-center flex-wrap gap-1 justify-center py-4 px-2">
                {provinceOutline.split("").map((char, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center text-center text-sm lg:text-lg font-bold uppercase
                      ${char === "_"
                        ? "border-transparent bg-transparent"
                        : typedText[i]
                          ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                          : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                      }`}
                  >
                    {char === "_" ? (
                      <span className="w-10 h-10 md:w-12 md:h-12 border-b-2 dark:border-gray-600 border-gray-100 " />
                    ) : (
                      typedText[i] || ""
                    )}
                  </div>
                ))}
              </div>
              {/* Mobile Keyboard */}
              <div
                className={`mx-auto container ${isMobile ? "mb-2" : "hidden"} lg:static lg:w-fit`}>
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

          {/* Next Province Button */}
          {isCompleted && (
            <div className="w-full absolute h-full bg-retro-bg/80 rounded-lg  flex items-center justify-center py-4 z-40">
              <button
                ref={nextButtonRef}
                onClick={() => handleNextProvince()}
                className="cursor-pointer p-3 text-sm lg:dark:bg-green-800/90 dark:hover:bg-green-600 bg-green-600 w-fit rounded hover:shadow-2xl"
              >
                Next Province
              </button>
            </div>
          )}
        </div>
      </div>
    </div >

  )
}

export default QuickStartMode
