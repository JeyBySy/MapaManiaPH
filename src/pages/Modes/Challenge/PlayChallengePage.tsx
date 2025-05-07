import React, { useEffect, useState } from 'react'
import { useChallenge } from '../../../hooks/useChallenge'
import Keyboard from '../../../components/Keyboard'
import MapSVG from '../../../components/MapSVG'
import { useUniquePathId } from '../../../hooks/useUniquePath'
// import HeartLives from '../../../components/HeartLives'
import LocationList from '../../../components/LocationList'
import { useNavigate } from 'react-router-dom'

const PlayChallengePage: React.FC = () => {
    const navigate = useNavigate()
    const { provinceGameStates, provinceLocations, updateProvinceLives, updateProvinceCompletion, isGameOver } = useChallenge()
    const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
    const [submitted, setSubmitted] = useState(false)
    const [typedText, setTypedText] = useState("")
    const [currentProvinceIndex, setCurrentProvinceIndex] = useState(0)
    const [currentLocationStep, setCurrentLocationStep] = useState(0)
    const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([])
    const currentProvince = provinceGameStates && provinceGameStates[currentProvinceIndex]

    useEffect(() => {
        setCurrentLocationStep(0)
        setCorrectGuesses([])
        setSubmitted(false)

    }, [currentProvinceIndex])

    const handleSubmit = () => {
        if (currentProvince && typedText.toUpperCase() === currentProvince.name.toUpperCase()) {
            setSubmitted(true)
            setTypedText('')
        } else {
            if (currentProvince) {
                updateProvinceLives(currentProvince.name, 'decrease')
                setTypedText('')
            }
        }
    }

    const handlePathClick = (clickedId: string) => {
        const cityName = answerKeys[clickedId];

        if (!cityName) {
            console.log(`❌ ${clickedId} is not in answerKeys.`);
            return;
        }

        const expectedAnswer = provinceLocations[currentProvinceIndex].locations[currentLocationStep];
        const isClickedLocationValid = cityName.trim().toLowerCase() === expectedAnswer.trim().toLowerCase();

        if (isClickedLocationValid) {
            const isFinalStep = correctGuesses.length === provinceLocations[currentProvinceIndex].locations.length - 1;
            const newCorrectGuesses: [string, string][] = [...correctGuesses, [cityName, clickedId]];

            setCorrectGuesses(newCorrectGuesses);

            if (isFinalStep) {
                setCurrentProvinceIndex((prev) => Math.min(prev + 1, provinceGameStates.length - 1));
                updateProvinceCompletion(currentProvince.name, true);
            }
            // setCurrentLocationStep((prev) =>
            //     Math.min(prev + 1, provinceLocations[currentProvinceIndex].locations.length - 1)
            // );
            setCurrentLocationStep((prev) => prev + 1)

        }
    };
    useEffect(() => {
        setCurrentProvinceIndex(0);
    }, []);

    useEffect(() => {
        if (!provinceGameStates || provinceGameStates.length === 0) {
            navigate('/challenge', { state: { from: location.pathname } })
            return
        }
    }, [provinceGameStates, navigate])

    if (!provinceGameStates || provinceGameStates.length === 0) {
        return (
            <div className="flex justify-center items-center h-[92dvh] border gap-2 flex-col">
                <p>Redirecting...</p>
            </div>
        )
    }

    return (
        <>
            {isGameOver ? (
                <div className='container mx-auto h-[92dvh] text-4xl w-full px-2 rounded-xl text-center flex justify-center items-center'>
                    <p className='capitalize text-[50%]  text-shadow-2xs border-2 p-8 shadow-2xl rounded-xl'>
                        Challenge Complete!
                    </p>
                </div>
            ) : (
                <>
                    <div className="container mx-auto relative px-2 gap-3 flex flex-row items-center justify-center">
                        {/* Left Side: Locations */}
                        {
                            submitted && (
                                <LocationList
                                    submitted={submitted}
                                    typedText={provinceLocations[currentProvinceIndex].locations[currentLocationStep]}
                                    locationName={provinceLocations[currentProvinceIndex].locations}
                                    currentLocationStep={currentLocationStep}
                                    correctGuesses={correctGuesses}
                                />
                            )
                        }

                        {/* Right Side: Map */}
                        <div className='w-full mx-auto h-[85vh] relative space-y-2 lg:h-[80vh] bg-transparent border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg z-30'>
                            <div className="relative w-full h-full flex py-2 items-center justify-center z-20">

                                {
                                    UniquePath && currentProvince && (
                                        <MapSVG
                                            provinceName={currentProvince.name}
                                            pathsData={UniquePath}
                                            mode="guess"
                                            isSubmitted={submitted}
                                            correctGuesses={correctGuesses}
                                            onPathClick={handlePathClick}
                                            isZoomable={true}
                                        />
                                    )
                                }
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
                </>
            )}
        </>
    )
}

export default PlayChallengePage
