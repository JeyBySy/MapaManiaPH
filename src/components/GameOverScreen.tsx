import React from 'react'
import MapSVG from './MapSVG'
import HeartLives from './HeartLives'
import { useNavigate } from 'react-router-dom';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import { SummaryRecord } from '../types/ChallengeTypes';
import PopUp from './PopUp/PopUp';
import TypingText from './TypingText';
import { Check, X } from 'lucide-react';

interface GameOverScreenType {
    provinceGuessRecords: { [provinceName: string]: SummaryRecord };
    pathsData: LGU_PATH_TYPE;
    currentProvince: { name: string; lives: number; isCompleted: boolean }
    correctGuesses: [string, string][]
    provinceGameStates: { name: string; lives: number; isCompleted: boolean }[];
    handleTryAgain: () => void
    isEmptyLives?: boolean
}

const GameOverScreen: React.FC<GameOverScreenType> = ({
    provinceGuessRecords,
    pathsData,
    currentProvince,
    correctGuesses,
    provinceGameStates,
    handleTryAgain,
    isEmptyLives = false

}) => {
    const navigate = useNavigate()
    return (
        <PopUp visible={true}>
            <div className='py-10 border dark:border-gray-700 border-neutral-300 dark:bg-retro-card/90 bg-blue-400/70 shadow-2xl w-screen flex flex-col items-center justify-center gap-4'>
                <div className=' text-shadow-2xs text-4xl lg:text-7xl flex flex-col gap-4 font-bold dark:text-neutral-100 text-neutral-100 capitalize text-center'>
                    <TypingText isSubmitted={true} text={"Game over"} className={`${isEmptyLives ? "text-retro-orange" : " text-white"}`} />
                    {/* <p className={`${isEmptyLives ? "text-retro-orange" : "dark:text-retro-purple text-blue-500"}`}>Game over</p> */}
                </div>
                {isEmptyLives ? (
                    <TypingText
                        isSubmitted={true}
                        text={`You've run out of lives on ${currentProvince.name}. Better luck next time!`}
                        className='shadow border w-full border-white/10 text-center py-2 px-2 dark:bg-neutral-600 bg-blue-300  text-xs lg:text-base text-retro-text dark:text-retro-mint text-shadow-2xs' />
                    // <p className='shadow border w-full border-white/10 text-center py-4 px-2 text-neutral-200 text-xs lg:text-base dark:text-neutral-300 text-shadow-2xs'>You've <span className='text-retro-orange'>run out of lives</span> on <span className='dark:text-retro-purple text-retro-mint'>"{currentProvince.name}"</span>. Better luck next time!</p>
                ) : (
                    <TypingText
                        isSubmitted={true}
                        text={"Congratulations! You've completed the challenge!"}
                        className='shadow border w-full border-white/10 text-center py-2 px-2 dark:bg-neutral-600 bg-blue-300  text-xs lg:text-base text-retro-text dark:text-retro-mint text-shadow-2xs' />
                    // <p className='shadow border w-full border-white/10 text-center py-4 px-2 dark:bg-retro-card text-neutral-200 text-xs lg:text-base dark:text-neutral-300 text-shadow-2xs'><span className='dark:text-retro-mint text-retro-yellow'>Congratulations!</span> You’ve completed the challenge!</p>
                )}
                <div className='flex flex-row justify-center gap-3 flex-wrap text-sm relative w-full'>
                    {Object.entries(provinceGuessRecords).map(([province, record]) => (
                        <>
                            <div key={province} className='shadow-2xl w-[30dvw] lg:w-auto relative border rounded-sm border-neutral-500/50'>
                                <div className={`h-[20dvh] lg:h-[30dvh] relative p-2 rounded-t-sm dark:bg-neutral-800/90 bg-blue-300/90`}>
                                    {pathsData && currentProvince && (
                                        <>
                                            <div className='absolute top-0 right-0 p-2'>
                                                {currentProvince?.isCompleted ? (<Check className='w-5 h-5 text-white p-1 bg-green-500 rounded-full' />) : (<X className='w-5 h-5 p-1 bg-red-500 rounded-full' />)}
                                            </div>
                                            <MapSVG
                                                provinceName={province}
                                                pathsData={pathsData}
                                                mode="summary"
                                                isSubmitted={true}
                                                correctGuesses={correctGuesses}
                                                isZoomable={false}
                                                offLoading={true}
                                                summaryRecord={record}
                                            />
                                        </>
                                    )}

                                </div>
                                {provinceGameStates.map(({ name, lives }) =>
                                (province === name ? (
                                    <div
                                        key={name}
                                        className={`text-[55%] lg:text-xs flex flex-col gap-2 items-center h-fit dark:bg-neutral-700 bg-blue-400 p-2 rounded-b-sm`}
                                    >
                                        <div className='flex flex-col w-full justify-between items-center'>
                                            <p>Lives Left</p>
                                            <HeartLives lives={lives} />
                                        </div>
                                        <div className='flex w-full justify-between items-center text-center'>
                                            <button className='w-full cursor-pointer border p-4 rounded'> Summary</button>
                                        </div>
                                    </div>
                                ) : null
                                ))}
                            </div>

                        </>

                    ))}
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={() => {
                            handleTryAgain()
                        }}
                        className='rounded cursor-pointer px-6 py-4 text-[10px] lg:text-sm dark:bg-retro-purple dark:hover:bg-retro-purple/70 bg-blue-500 hover:bg-blue-400/70 text-white transition'
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => navigate('/exploremap')}
                        className='rounded flex cursor-pointer px-6 py-4 text-[10px] lg:text-sm bg-emerald-400 hover:bg-emerald-400/70 text-white  transition'
                    >
                        Explore Map
                    </button>
                </div>
            </div>
        </PopUp>
    )
}

export default GameOverScreen
