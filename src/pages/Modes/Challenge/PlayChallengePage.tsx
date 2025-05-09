import React, { useEffect, useState } from 'react'
import { useChallenge } from '../../../hooks/useChallenge'
import Keyboard from '../../../components/Keyboard'
import MapSVG from '../../../components/MapSVG'
import { useUniquePathId } from '../../../hooks/useUniquePath'
import HeartLives from '../../../components/HeartLives'
import LocationList from '../../../components/LocationList'
import GameOverScreen from '../../../components/GameOverScreen'
import { useNavigate } from 'react-router-dom'

const PlayChallengePage: React.FC = () => {
    const navigate = useNavigate()
    const { provinceGameStates, provinceLocations, updateProvinceLives, updateProvinceCompletion, isGameOver, selectedProvinces } = useChallenge()
    const { pathsWithIds: UniquePath, answerKeys } = useUniquePathId()
    const [submitted, setSubmitted] = useState(false)
    const [typedText, setTypedText] = useState("")
    const [currentProvinceIndex, setCurrentProvinceIndex] = useState(0)
    const [currentLocationStep, setCurrentLocationStep] = useState(0)
    const [correctGuesses, setCorrectGuesses] = useState<[string, string][]>([])
    const currentProvince = provinceGameStates && provinceGameStates[currentProvinceIndex]
    const [provinceGuessRecords, setProvinceGuessRecords] = useState<{
        [provinceName: string]: {
            correctGuessesRecord: string[],
            wrongGuessesRecord: string[],
            currentGuessRecord: string
        }
    }>({});
    const [isEmptyLives, setIsEmptyLives] = useState(false)

    useEffect(() => {
        const initialRecords = selectedProvinces.reduce((acc, provinceName) => {
            acc[provinceName] = {
                correctGuessesRecord: [],
                wrongGuessesRecord: [],
                currentGuessRecord: ""
            };
            return acc;
        }, {} as {
            [provinceName: string]: {
                correctGuessesRecord: string[],
                wrongGuessesRecord: string[],
                currentGuessRecord: string
            };
        });

        setProvinceGuessRecords(initialRecords);
    }, [selectedProvinces]);

    useEffect(() => {
        setCurrentLocationStep(0)
        setCorrectGuesses([])
        setSubmitted(false)
    }, [currentProvinceIndex])

    useEffect(() => {
        if (!currentProvince) return;

        const expectedCityName = provinceLocations[currentProvinceIndex]?.locations[currentLocationStep];

        const cityId = Object.keys(answerKeys).find(key => answerKeys[key].trim().toLowerCase() === expectedCityName?.trim().toLowerCase());

        setProvinceGuessRecords(prev => ({
            ...prev,
            [currentProvince.name]: {
                ...prev[currentProvince.name],
                currentGuessRecord: cityId || ""
            }
        }));
    }, [currentLocationStep, currentProvinceIndex, currentProvince, provinceLocations, answerKeys]);



    const handleLifeLoss = () => {
        if (!currentProvince) return;

        updateProvinceLives(currentProvince.name, 'decrease');

        if (currentProvince.lives - 1 <= 0) {
            setIsEmptyLives(true)
        }
    };

    const handleSubmit = () => {
        if (currentProvince && typedText.toUpperCase() === currentProvince.name.toUpperCase()) {
            setSubmitted(true)
            setTypedText('')
        } else {
            if (currentProvince) {
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

            setProvinceGuessRecords(prev => ({
                ...prev,
                [currentProvince.name]: {
                    correctGuessesRecord: [
                        ...(prev[currentProvince.name]?.correctGuessesRecord || []),
                        clickedId
                    ],
                    wrongGuessesRecord: prev[currentProvince.name]?.wrongGuessesRecord || [],
                    currentGuessRecord: provinceLocations[currentProvinceIndex].locations[currentLocationStep]
                }
            }));

            if (isFinalStep) {
                setCurrentProvinceIndex((prev) => Math.min(prev + 1, provinceGameStates.length - 1));
                updateProvinceCompletion(currentProvince.name, true);
            }
            setCurrentLocationStep((prev) => prev + 1);
        } else {
            handleLifeLoss();

            setProvinceGuessRecords(prev => ({
                ...prev,
                [currentProvince.name]: {
                    correctGuessesRecord: prev[currentProvince.name]?.correctGuessesRecord || [],
                    wrongGuessesRecord: [
                        ...(prev[currentProvince.name]?.wrongGuessesRecord || []),
                        clickedId
                    ],
                    currentGuessRecord: provinceLocations[currentProvinceIndex].locations[currentLocationStep]
                }
            }));
        }

    };

    const handleTryAgain = () => {
        setIsEmptyLives(false)
        setCurrentProvinceIndex(0)
        setCurrentLocationStep(0)
        setCorrectGuesses([])
        setSubmitted(false)
        navigate('/challenge')
    }

    useEffect(() => {
        setCurrentProvinceIndex(0);

        if (provinceGameStates && provinceGameStates.length !== 0 && provinceGameStates[0].lives === 0) {
            setIsEmptyLives(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (location.pathname === '/challenge/play' && provinceGameStates && provinceGameStates.length === 0) return

        if (provinceGameStates && provinceGameStates[0].lives === 0 && !provinceGameStates[0].isCompleted) {
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceGameStates, location.pathname, isEmptyLives])

    if (provinceGameStates && provinceGameStates.length === 0) {
        return (
            <>
                <div className="flex justify-center items-center h-[92dvh] gap-2 flex-col text-center"> <p>No Province Data To Play <br />Go back</p> </div>
            </>
        )
    }

    return (
        <>
            <div className="container mx-auto relative px-2 gap-3 flex flex-row items-start justify-center">
                {(isGameOver || isEmptyLives) && UniquePath && (
                    <GameOverScreen
                        provinceGuessRecords={provinceGuessRecords}
                        pathsData={UniquePath}
                        currentProvince={currentProvince}
                        correctGuesses={correctGuesses}
                        provinceGameStates={provinceGameStates}
                        handleTryAgain={handleTryAgain}
                        isEmptyLives={isEmptyLives} />
                )}

                {/* Left Side: Locations */}
                {submitted && (
                    <>
                        <LocationList
                            submitted={submitted}
                            typedText={provinceLocations[currentProvinceIndex].locations[currentLocationStep]}
                            locationName={provinceLocations[currentProvinceIndex].locations}
                            currentLocationStep={currentLocationStep}
                            correctGuesses={correctGuesses}
                        />
                    </>
                )
                }

                {/* Right Side: Map */}
                <div className={`
                            w-full mx-auto h-[85vh] relative space-y-2 lg:h-[80vh] bg-transparent border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg z-30
                            ${isEmptyLives ? "pointer-events-none" : "pointer-events-auto"}
                        `}>
                    <div className="relative w-full h-full flex py-2 items-center justify-center z-20">
                        {submitted && (
                            <div className='flex absolute top-0 right-0 p-2 text-xs flex-col gap-2 z-30'>
                                <HeartLives lives={currentProvince.lives} />
                            </div>
                        )}
                        {UniquePath && currentProvince && (
                            <MapSVG
                                provinceName={currentProvince.name}
                                pathsData={UniquePath}
                                mode="challenge"
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
        </>
    )
}

export default PlayChallengePage
