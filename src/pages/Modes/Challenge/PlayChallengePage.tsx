import React, { useEffect, useState } from 'react'
import { useChallenge } from '../../../hooks/useChallenge'
import Keyboard from '../../../components/Keyboard'
import MapSVG from '../../../components/MapSVG'
import { useUniquePathId } from '../../../hooks/useUniquePath'
// import HeartLives from '../../../components/HeartLives'
import LocationList from '../../../components/LocationList'

const PlayChallengePage: React.FC = () => {
    const { provinceGameStates, provinceLocations, updateProvinceLives, updateProvinceCompletion } = useChallenge()
    const [currentProvinceIndex, setCurrentProvinceIndex] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
    const [typedText, setTypedText] = useState("")
    const [challengeComplete, setChallengeComplete] = useState(false)
    const [currentLocationStep, setCurrentLocationStep] = useState(0)
    const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([])

    const currentProvince = provinceGameStates[currentProvinceIndex]

    useEffect(() => {
        setCurrentLocationStep(0)
        setCorrectGuesses([])
        setSubmitted(false)

    }, [currentProvinceIndex])

    const handleSubmit = () => {
        if (currentProvince && typedText.toUpperCase() === currentProvince.name.toUpperCase()) {
            setSubmitted(true)
            updateProvinceCompletion(currentProvince.name, true)
            setTypedText('')

            if (currentProvinceIndex === provinceGameStates.length) {
                setChallengeComplete(true)
            }
        } else {
            if (currentProvince) {
                updateProvinceLives(currentProvince.name, 'decrease')
                setTypedText('')
            }
        }
    }

    const handlePathClick = (clickedId: string) => {
        const cityName = answerKeys[clickedId]
        const expectedAnswer = provinceLocations[currentProvinceIndex].locations[currentLocationStep]

        if (!cityName) {
            console.log(`❌ ${clickedId} is not in answerKeys.`)
            return
        }


        if (correctGuesses.length + 1 === provinceLocations[currentProvinceIndex].locations.length) {
            setCurrentProvinceIndex(currentProvinceIndex + 1)
        } else {
            if (cityName.trim().toLowerCase() === expectedAnswer?.trim().toLowerCase()) {
                setCorrectGuesses((prev) => [...prev, [cityName, clickedId]])
                setCurrentLocationStep((prev) => prev + 1) // move to next city                     
            }
        }

    }

    if (!provinceGameStates || provinceGameStates.length === 0) {
        console.log("dasdasdsadasdas");

        return (
            <div className="flex justify-center items-center h-full">
                <p>No data available or still loading...</p>
            </div>
        )
    }

    return (
        <>
            {!challengeComplete && provinceGameStates && provinceGameStates.length > 0 ? (
                <>
                    <div className="container mx-auto relative px-2 gap-3 flex flex-row items-center justify-center">
                        {/* <div className={`w-full fixed bottom-0 lg:static lg:w-4/12 flex-col lg:h-[80vh] z-50 lg:rounded-t-md lg:flex border bg-neutral-200 dark:bg-gray-800 border-gray-300 dark:border-gray-500`}>
                                <div className='dark:bg-slate-600 bg-blue-400'>
                                    <p className="text-xs lg:text-sm hidden lg:block uppercase tracking-wider p-4">
                                        Guess the Location
                                    </p>
                                </div>
                                {provinceLocations[currentProvinceIndex] ? (
                                    provinceLocations[currentProvinceIndex].locations.map((location, index) => (
                                        <div key={index}>
                                            {location}
                                        </div>
                                    ))
                                ) : (
                                    <>
                                    </>
                                )}
                             </div> 
                        */}

                        {/* Left Side: Locations */}
                        {
                            provinceLocations[currentProvinceIndex] && provinceGameStates[currentProvinceIndex] ? (
                                <LocationList
                                    submitted={submitted}
                                    typedText={provinceLocations[currentProvinceIndex].locations[currentLocationStep]}
                                    locationName={provinceLocations[currentProvinceIndex].locations}
                                    currentLocationStep={currentLocationStep}
                                    correctGuesses={correctGuesses}
                                    provinceOutline={''}
                                />
                            ) : (
                                <p>Loading or invalid data...</p>
                            )
                        }


                        {/* Right Side: Map */}
                        <div className='w-full mx-auto h-[85vh] relative space-y-2 lg:h-[80vh] bg-transparent border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg z-30'>
                            <div className="relative w-full h-full flex py-2 items-center justify-center z-20">
                                {UniquePath && (
                                    <MapSVG
                                        provinceName={currentProvince.name}
                                        pathsData={UniquePath}
                                        mode="guess"
                                        isSubmitted={submitted}
                                        correctGuesses={correctGuesses}
                                        onPathClick={handlePathClick}
                                        isZoomable={true}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-end mx-auto items-center w-full">
                                {!submitted && (
                                    <Keyboard
                                        value={typedText}
                                        onType={setTypedText}
                                        limit={currentProvince.name?.length || 0}
                                        onSubmit={handleSubmit}
                                        provinceValue={currentProvince.name}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex absolute border p-2 text-xs bg-gray-60 0 flex-col gap-2 z-30 bg-retro-main dark:bg-retro-bg'>
                            <HeartLives lives={currentProvince.lives} />              
                        </div> */}
                    {challengeComplete && (
                        <>
                            complete challenge
                        </>
                    )}
                </>
            ) : (
                <div>sdasdasdsa</div>
            )}
        </>
    )
}

export default PlayChallengePage
