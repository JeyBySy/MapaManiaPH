/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import ProvinceSkeleton from './Skeleton/ProvinceSkeleton';
import formatProvinceName from '../util/formatProvinceName';
import TypingText from './TypingText';

interface SVGProps {
    provinceName: string;
    pathsData: LGU_PATH_TYPE;
    mode?: 'guess' | 'explore';
    isSubmitted?: boolean;
    correctGuesses?: [string, string][];
    onPathClick?: (id: string) => void;
    selectedLocationId?: string | null
}

const MapSVG: React.FC<SVGProps> = ({
    provinceName,
    pathsData,
    mode,
    isSubmitted = true,
    correctGuesses = [],
    onPathClick,
    selectedLocationId,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const province = pathsData[provinceName];

    useEffect(() => {
        const loadMap = async () => {
            if (provinceName) {
                setIsLoading(true);
                await new Promise((res) => setTimeout(res, 500)); // Simulate loading delay
                setIsLoading(false);
            }
        };

        loadMap();
    }, [provinceName]);

    if (!province) return null;

    const isGuessMode = mode === 'guess';
    const isExploreMode = mode === 'explore';

    return (
        <>
            {isLoading ? (
                <ProvinceSkeleton />
            ) : (
                <div className="flex flex-col items-center justify-between h-full w-full">
                    <div className="w-full text-start px-5 lg:pb-10 h-0">
                        <TypingText
                            text={selectedLocationId}
                            isSubmitted={true}
                            isMasked={false}
                            className={`text-green-500 text-sm lg:text-2xl text-shadow`}
                        />
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-full flex-1 ${isGuessMode && !isSubmitted ? 'pointer-events-none' : 'pointer-events-auto'}`}
                        viewBox={province.viewBox || '0 0 100 100'}
                    >
                        {province.paths.map((path, index) => {
                            const isPathCorrect = path.id && correctGuesses.some(([_, id]) => id === path.id);
                            const isSelected = path.id === selectedLocationId;

                            const hoverFill = isGuessMode ? 'fill-accent-hover' : 'hover:fill-green-400';
                            const baseFill = isPathCorrect ? 'fill-accent' : `fill-gray-50 dark:fill-gray-200`;

                            const dynamicFill = isSelected
                                ? 'fill-green-400'
                                : `${hoverFill} ${baseFill}`;

                            const label = correctGuesses.find(([_, id]) => id === path.id)?.[0] || path.id;

                            return (
                                <path
                                    key={path.id || index}
                                    id={path.id || undefined}
                                    d={path.d}
                                    className={`map_svg ${dynamicFill} drop-shadow-accent-hover transition-all`}
                                    stroke="black"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (isGuessMode && path.id && onPathClick) {
                                            onPathClick(path.id);
                                        } else if (!isGuessMode && path.id && selectedLocationId && onPathClick) {
                                            onPathClick(path.id);
                                        }

                                    }}

                                >
                                    {isPathCorrect && (<title>{label}</title>)}
                                    {!isGuessMode && <title>{path.id}</title>}
                                </path>
                            );
                        })}
                    </svg>

                    {isExploreMode && (
                        <p className="text-center text-xs sm:text-sm p-2 break-words line-clamp-2 w-full">
                            {formatProvinceName(provinceName)}
                        </p>
                    )}
                </div>
            )}
        </>
    );
}

export default MapSVG;
