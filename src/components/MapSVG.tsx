/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import ProvinceSkeleton from './Skeleton/ProvinceSkeleton';
import { ignoreCharProvinceName, maskProvinceName } from '../util/formatProvinceName';
import TypingText from './TypingText';
import { ZoomOut } from 'lucide-react';
import { SummaryRecord } from '../types/ChallengeTypes';
import { useZoomPan } from '../hooks/useZoomPan';

interface SVGProps {
    provinceName: string;
    pathsData: LGU_PATH_TYPE;
    mode?: 'guess' | 'explore' | 'summary' | 'challenge';
    isSubmitted?: boolean;
    correctGuesses?: [string, string][];
    onPathClick?: (id: string) => void;
    selectedLocationId?: string | null;
    isZoomable?: boolean;
    offLoading?: boolean;
    summaryRecord?: SummaryRecord
    hideProvinceName?: boolean
}

const MapSVG: React.FC<SVGProps> = ({
    provinceName,
    pathsData,
    mode = 'explore',
    isSubmitted = true,
    correctGuesses = [],
    onPathClick,
    selectedLocationId,
    isZoomable = false,
    offLoading,
    summaryRecord,
    hideProvinceName = false
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const province = pathsData[provinceName];
    const {
        gRef,
        handleWheel,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        resetTransform,
        attachSvgRef,
        hasZoomed,
    } = useZoomPan({ isZoomable });

    // Handle initial map loading
    useEffect(() => {
        const loadMap = async () => {
            if (provinceName) {
                await setIsLoading(true);
                await new Promise((res) => setTimeout(res, 500));
                await setIsLoading(false);
            }
        };
        loadMap();
    }, [provinceName]);

    const handlePathClick = (pathId: string | undefined | null) => {
        if (!pathId || !onPathClick) return;
        onPathClick(pathId);
    };

    if (!province) return null;

    return (
        <>
            {!offLoading && isLoading ? (
                <ProvinceSkeleton />
            ) : (
                <div className="flex flex-col justify-between h-full w-full">
                    {selectedLocationId && (
                        <div className="w-fit text-start absolute text-white z-10">
                            <div className='w-fit p-4 rounded '>
                                <TypingText
                                    text={selectedLocationId}
                                    isSubmitted={true}
                                    isMasked={false}
                                    className="text-green-500 text-base lg:text-2xl text-shadow"
                                />
                            </div>
                        </div>
                    )}

                    {isZoomable && hasZoomed && (
                        <button
                            title="Reset Zoom"
                            onClick={(e) => {
                                (e.currentTarget as HTMLButtonElement).blur();
                                resetTransform();
                            }}
                            className="z-30 mb-2 px-2 py-2 cursor-pointer dark:text-white text-neutral-700 dark:bg-retro-bg border bg-white rounded-md transition absolute bottom-4 right-4"
                        >
                            <ZoomOut />
                        </button>
                    )}

                    <svg
                        ref={attachSvgRef}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-full flex-1 z-0 px-2 ${(mode === 'guess' || mode === 'challenge') && !isSubmitted ? 'pointer-events-none' : 'pointer-events-auto'}`}
                        viewBox={province.viewBox || '0 0 100 100'}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseUp}
                    >
                        <g ref={gRef}>
                            {province.paths.map((path, index) => {
                                const isPathCorrect = path.id && correctGuesses.some(([_, id]) => id === path.id);
                                const isSelected = path.id === selectedLocationId;

                                let dynamicFill = '';

                                if (mode === 'summary' && summaryRecord) { // For Summary Record style
                                    const { correctGuessesRecord, wrongGuessesRecord, currentGuessRecord } = summaryRecord;
                                    if (path.id && correctGuessesRecord.includes(path.id)) {
                                        dynamicFill = 'fill-accent pointer-events-none';
                                    } else if (path.id && wrongGuessesRecord.includes(path.id)) {
                                        dynamicFill = 'fill-red-400 pointer-events-none';
                                    } else if (path.id && currentGuessRecord.includes(path.id)) {
                                        dynamicFill = 'dark:fill-retro-mint fill-blue-400 pointer-events-none';
                                    }
                                    else {
                                        dynamicFill = 'fill-white/40 dark:fill-gray-200/40 pointer-events-none';
                                    }
                                } else {
                                    const baseFill = isPathCorrect
                                        ? `fill-accent ${mode === 'challenge' && "pointer-events-none"}`
                                        : 'fill-gray-50 dark:fill-gray-200';

                                    const hoverFill = mode === 'guess' || mode === 'challenge' ? 'fill-accent-hover' : 'hover:fill-green-400';

                                    dynamicFill = isSelected
                                        ? 'fill-green-400'
                                        : `${hoverFill} ${baseFill}`;
                                }

                                const label = correctGuesses.find(([_, id]) => id === path.id)?.[0] || path.id;

                                return (
                                    <path
                                        key={path.id || index}
                                        id={path.id || undefined}
                                        d={path.d}
                                        className={`map_svg drop-shadow-accent-hover transition-all ${dynamicFill}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePathClick(path.id);
                                        }}
                                    >
                                        <title>
                                            {mode === 'guess' && isPathCorrect
                                                ? label
                                                : mode === 'explore'
                                                    ? path.id
                                                    : ''}
                                        </title>
                                    </path>
                                );
                            })}
                        </g>
                    </svg>
                    {(mode === 'summary' || (!hideProvinceName && mode === 'explore')) && (
                        <div className='w-full bg-transparent flex items-center justify-center'>
                            <p className="text-center text-[45%] sm:text-sm p-2 break-words line-clamp-2">
                                {hideProvinceName
                                    ? maskProvinceName(provinceName)
                                    : ignoreCharProvinceName(provinceName)}
                            </p>
                        </div>
                    )}
                </div >
            )}
        </>
    );
};

export default MapSVG;
