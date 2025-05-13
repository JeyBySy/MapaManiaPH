import React from 'react'
import MapSVG from '../MapSVG'
import HeartLives from './HeartLives'
import { useNavigate } from 'react-router-dom';
import PopUp from '../PopUp/PopUp';
// import TypingText from './TypingText';
import { Check, X } from 'lucide-react';
import { GameOverScreenType } from '../../types/ChallengeTypes'
import GameStats from './GameStats';
import GameOverMessage from './GameOverMessage';
import { useChallenge } from '../../hooks/useChallenge';
import formatTime from '../../util/formatTime';


const GameOverScreen: React.FC<GameOverScreenType> = ({
    provinceGuessRecords,
    pathsData,
    currentProvince,
    correctGuesses,
    provinceGameStates,
    handleTryAgain,
    isEmptyLives = false,
    time,
    timeOut,
    surrender
}) => {
    const navigate = useNavigate()
    const { provinceLocations } = useChallenge()
    const completedCount = provinceGameStates.filter(p => p.isCompleted).length;
    const totalCount = provinceGameStates.length;
    const totalLocations = provinceLocations.reduce((acc, curr) => acc + curr.locations.length, 0);
    const totalCorrectGuesses = Object.values(provinceGuessRecords).reduce((acc, curr) => acc + curr.correctGuessesRecord.length, 0);
    const isFinish = totalLocations === totalCorrectGuesses

    return (
        <PopUp visible={true}>
            <div className='py-10 h-screen dark:bg-retro-card bg-blue-400 shadow-2xl w-screen flex flex-col justify-evenly overflow-y-auto'>
                <div className=' text-shadow-2xs text-4xl lg:text-7xl flex flex-col gap-4 font-bold dark:text-neutral-100 text-neutral-100 capitalize text-center'>
                    {/* <TypingText isSubmitted={true} text={"Game over"} className={`${isEmptyLives ? "text-retro-orange" : " text-white"}`} /> */}
                    <p className={`${(isEmptyLives || timeOut) && !isFinish ? "text-retro-orange" : "dark:text-retro-purple text-blue-500"}`}>Game over</p>
                </div>
                <GameOverMessage surrender={surrender} finish={isFinish} timeOut={timeOut} isEmptyLives={isEmptyLives} provinceName={currentProvince.name} />
                <div className="w-full relative dark:bg-neutral-700 bg-blue-300">
                    <div className="flex overflow-x-auto whitespace-nowrap justify-start px-2 md:justify-evenly xl:w-[75%] w-full mx-auto">
                        <GameStats title="Province Completed" value={completedCount} totalValue={totalCount} />
                        <GameStats title="number of guessed locations" value={totalCorrectGuesses} totalValue={totalLocations} />
                        <GameStats title="time consumed" value={formatTime(time)} />
                        <GameStats title="hints used during the game" value={1} />
                        <GameStats title="longest streak" value={1} />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="flex flex-row justify-center gap-3 flex-wrap text-sm relative w-full">
                        {Object.entries(provinceGuessRecords).map(([province, record]) => {
                            const provinceState = provinceGameStates.find((p) => p.name === province);

                            if (!provinceState) return null;

                            const { lives, isCompleted } = provinceState;

                            return (
                                <div
                                    key={province}
                                    className="shadow-2xl w-[30dvw] lg:w-auto relative border rounded-sm border-neutral-500/50"
                                >
                                    <div className="h-[20dvh] lg:h-[30dvh] relative p-2 rounded-t-sm dark:bg-neutral-800/90 bg-blue-300/90">
                                        {pathsData && (
                                            <>
                                                <div className="absolute top-0 right-0 p-2">
                                                    {isCompleted ? (
                                                        <Check className="w-5 h-5 text-white p-1 bg-green-500 rounded-full" />
                                                    ) : (
                                                        <X className="w-5 h-5 p-1 bg-red-500 rounded-full" />
                                                    )}
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
                                                    hideProvinceName={!(lives === 0 || isCompleted)}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="text-[55%] lg:text-xs flex flex-col gap-2 items-center h-fit dark:bg-neutral-700 bg-blue-400 p-2 rounded-b-sm">
                                        <div className="flex flex-col w-full justify-between items-center">
                                            <p>Lives Left</p>
                                            <HeartLives lives={lives} />
                                        </div>
                                        {/* <div className="flex w-full justify-between items-center text-center">
                                        <button className={`w-full cursor-pointer shadow border border-gray-600 p-4 rounded-full hover:bg-retro-card/90 bg-retro-bg`} >
                                            Summary
                                        </button>
                                    </div> */}
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                    <div className='flex gap-2 justify-center text-[8px] px-10'>
                        <div className=' flex items-center justify-center'>
                            <p>Correct Answer</p>: <div className="border rounded-full w-3 h-3 dark:bg-retro-purple bg-retro-mint"></div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <p> Wrong Answer</p>: <div className="border rounded-full w-3 h-3 bg-red-400"></div>
                        </div>
                        <div className='  flex items-center justify-center'>
                            <p> Last Location </p>: <div className="border rounded-full w-3 h-3 dark:bg-retro-mint bg-blue-400"></div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <p>Neutral</p>: <div className="border rounded-full w-3 h-3 bg-white/40 dark:bg-gray-200/40 "></div>
                        </div>

                    </div>
                </div>
                <div className='flex gap-2 justify-center'>
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
