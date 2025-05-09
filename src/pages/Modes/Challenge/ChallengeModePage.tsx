import { Dices, MapPinned } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../../../components/Footer';
import { useChallenge } from '../../../hooks/useChallenge';
import MapSVG from '../../../components/MapSVG';
import { useUniquePathId } from '../../../hooks/useUniquePath';

export const ChallengeModePage: React.FC = () => {
    const navigate = useNavigate()
    const { pickRandomProvinces, selectedProvinces, isLoading, startGame } = useChallenge()
    const { pathsWithIds: UniquePath } = useUniquePathId()

    const handlePlayButton = () => {
        startGame();
        navigate(`play`)
    }

    useEffect(() => {
        if (location.pathname === '/challenge') {
            pickRandomProvinces();
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <div className='min-h-[92dvh] grid grid-rows-[1fr_auto]'>
            <main className="flex w-full relative">
                <div className='mx-auto h-full flex justify-between '>
                    <div className='grid grid-row-2 w-full'>
                        <div className='flex flex-row items-center justify-evenly lg:justify-center lg:gap-3 gap-1 flex-wrap text-sm relative w-full'>
                            {!isLoading && selectedProvinces.length > 0 ? (
                                selectedProvinces.map((province, idx) => (
                                    <div
                                        key={idx}
                                        className='shadow-2xl flex-1/4 w-[30dvw] relative border  border-gray-300 dark:border-gray-500 p-3 text-center overflow-hidden flex items-center justify-center rounded-xl'
                                    >
                                        {UniquePath && (
                                            // <div className='h-[30dvh] lg:h-[55dvh] w-full '>
                                            <div className='w-[100dvw] relative'>
                                                <div className='h-[20dvh] lg:h-[50dvh] relative rounded-t-sm'>
                                                    <MapSVG
                                                        provinceName={province}
                                                        pathsData={UniquePath}
                                                        mode="guess"
                                                        isSubmitted={false}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="lg:h-[54.4dvh] col-span-12 border w-full rounded-xl text-center text-gray-500 flex justify-center items-center">No provinces yet.</div>
                            )}
                        </div>
                        <div className='w-full items-center justify-start lg:justify-center flex gap-2 flex-col lg:flex-row'>
                            <button
                                onClick={(e) => {
                                    (e.target as HTMLButtonElement).blur()
                                    pickRandomProvinces()
                                }}
                                className="cursor-pointer border py-3 lg:p-5 rounded text-[55%] lg:text-sm flex items-center lg:flex-col justify-center gap-1 lg:w-fit lg:min-w-[12%] w-[80%]"
                            >
                                <Dices className={`lg:w-8 lg:h-8`} />
                                <p className='w-1/3 lg:w-fit'>Re-roll</p>
                            </button>
                            <button className='cursor-pointer border py-3 lg:p-5 rounded  text-[55%] lg:text-sm flex items-center lg:flex-col justify-center gap-1 lg:w-fit lg:min-w-[12%] w-[80%]'
                                onClick={() => {
                                    handlePlayButton()
                                }}>
                                <MapPinned className={`lg:w-8 lg:h-8 `} />
                                <p className='w-1/3 lg:w-fit'>Play</p>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
