import { Dices, MapPinned } from 'lucide-react';
import React from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../../../components/Footer';
import { useChallenge } from '../../../hooks/useChallenge';
import MapSVG from '../../../components/MapSVG';
import { useUniquePathId } from '../../../hooks/useUniquePath';

export const ChallengeModePage: React.FC = () => {
    const navigate = useNavigate()
    const { pickRandomProvinces, selectedProvinces } = useChallenge()
    const { pathsWithIds: UniquePath } = useUniquePathId()

    const handlePlayButton = () => {
        navigate(`play`)
    }

    return (
        <div className='min-h-[92dvh] grid grid-rows-[1fr_auto]'>
            <main className="flex flex-col w-full items-center lg:justify-center container mx-auto relative">
                <div className='container mx-auto px-2 lg:auto h-full flex justify-between '>
                    <div className='grid grid-row-2 gap-10 w-full'>
                        <div className='lg:grid lg:grid-cols-[1fr_1fr_1fr] gap-2 flex overflow-hidden items-center w-full justify-between'>
                            {selectedProvinces.length > 0 ? (
                                selectedProvinces.map((province, idx) => (
                                    <div
                                        key={idx}
                                        className='border h-[30dvh] lg:h-fit border-gray-300 dark:border-gray-500 p-5 text-center overflow-hidden flex items-center justify-center rounded-xl'
                                    >
                                        {UniquePath && (
                                            <div className='lg:h-[50dvh] lg:w-full'>
                                                <MapSVG
                                                    provinceName={province}
                                                    pathsData={UniquePath}
                                                    mode="guess"
                                                    isSubmitted={false} //False to make pointer-events-none
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center text-gray-500">No provinces yet.</div>
                            )}

                        </div>

                        <div className='w-full items-center justify-center flex gap-2 flex-col lg:flex-row'>
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
