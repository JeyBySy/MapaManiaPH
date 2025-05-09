import React, { useState, useRef, useEffect } from "react"
import { useProvince } from "../../hooks/useProvince"
import Keyboard from "../../components/Keyboard"
import { RotateCw } from "lucide-react"
import ProvinceSkeleton from "../../components/Skeleton/ProvinceSkeleton"
import TypingText from "../../components/TypingText"
import { useUniquePathId } from "../../hooks/useUniquePath"
import MapSVG from "../../components/MapSVG"
import LocationList from "../../components/LocationList"

const QuickStartMode: React.FC = () => {
  const { provinceOutline, nextProvince, locationName, refreshPaths } = useProvince(true)
  const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const isCorrect = typedText.toLowerCase() === provinceOutline.toLowerCase()
  const [currentLocationStep, setCurrentLocationStep] = useState(0) // track progress
  const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([])
  const [showMap, setShowMap] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const isCompleted = correctGuesses.length === locationName.length
  const [isSpinning, setIsSpinning] = useState(false)

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
    setCurrentLocationStep(0)
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

    const expectedAnswer = locationName[currentLocationStep]

    if (cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()) {
      setCorrectGuesses((prev) => [...prev, [cityName, clickedId]])
      setCurrentLocationStep((prev) => prev + 1) // move to next city      
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
    const currentItem = itemRefs.current[currentLocationStep]

    if (currentItem) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [currentLocationStep])

  useEffect(() => {
    if (nextButtonRef.current && isCompleted) {
      nextButtonRef.current.focus();
    }
  }, [isCompleted]);


  return (
    <div className="lg:flex lg:flex-row gap-1 lg:h-fit justify-center lg:container lg:mx-auto">
      {/* LEFT: Location List */}
      {submitted && (
        <LocationList
          submitted={submitted}
          typedText={typedText}
          locationName={locationName}
          currentLocationStep={currentLocationStep}
          correctGuesses={correctGuesses}
        />
      )}

      {/* RIGHT: Map Display*/}
      <div className="grid grid-rows-[1fr_auto] lg:block lg:grid-rows-none h-fit w-full px-2 space-y-2 lg:w-12/12 lg:h-auto mx-auto overflow-hidden relative ">
        {/* Map */}
        <div className={`w-full mx-auto ${submitted ? 'h-[85vh]' : 'h-[70vh]'} relative lg:h-[80vh] bg-transparent border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg z-30`}>
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
        <div className="flex flex-col justify-end mx-auto items-center w-full">
          {/* Keyboard */}
          {!submitted && (
            <Keyboard
              value={typedText}
              onType={setTypedText}
              limit={provinceOutline.length}
              onSubmit={handleSubmit}
              provinceValue={provinceOutline}
            />
          )}
          {/* Next Province Button */}
          {isCompleted && (
            <div className="w-full absolute h-full dark:bg-retro-bg/80 bg-neutral-300/20 backdrop-blur-xs rounded-lg flex items-center justify-center z-40">
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
