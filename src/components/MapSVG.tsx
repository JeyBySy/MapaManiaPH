import React, { useEffect, useState } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import ProvinceSkeleton from './Skeleton/ProvinceSkeleton';
import formatProvinceName from '../util/formatProvinceName';


interface SVGProps {
    provinceName: string;
    pathsData: LGU_PATH_TYPE;
    mode: 'guess' | 'explore';
    isSubmitted?: boolean;
    correctGuesses?: [string, string][];
    onPathClick?: (id: string) => void;
}

const MapSVG: React.FC<SVGProps> = ({
    provinceName,
    pathsData,
    mode,
    isSubmitted = true,
    correctGuesses = [],
    onPathClick,
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
    const isExploreMode = mode === "explore"
    return (
        <>
            {isLoading ? (
                <ProvinceSkeleton />
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-full h-full ${isGuessMode && !isSubmitted ? 'pointer-events-none' : 'pointer-events-auto'
                            }`}
                        viewBox={province.viewBox || '0 0 100 100'}

                    >
                        {province.paths.map((path, index) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const isPathnCorrect = path.id && correctGuesses.some(([_, id]) => id === path.id);
                            const hoverFill = isGuessMode ? 'fill-accent-hover' : 'hover:fill-green-400';
                            const fillClass = isPathnCorrect ? 'fill-accent' : `${hoverFill} fill-gray-50 dark:fill-gray-200 `;
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const label = correctGuesses.find(([_, id]) => id === path.id)?.[0] || path.id;
                            return (
                                <path
                                    key={path.id || index}
                                    id={path.id || undefined}
                                    d={path.d}
                                    className={`map_svg ${fillClass} drop-shadow-accent-hover`}
                                    stroke="black"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (path.id && onPathClick) {
                                            onPathClick(path.id);
                                        }
                                    }}
                                // onTouchStart={(e) => {
                                //     e.preventDefault();
                                //     if (path.id && onPathClick) {
                                //         onPathClick(path.id);
                                //     }
                                // }}
                                >
                                    {isPathnCorrect && (<title>{label}</title>)}
                                    {!isGuessMode && <title>{path.id}</title>}
                                </path>
                            );
                        })}
                    </svg>
                    {isExploreMode && (
                        <>
                            <p className="text-center text-sm font-medium mt-1">{formatProvinceName(provinceName)}</p>
                        </>
                    )}
                </>
            )}

        </>
    )
}

export default MapSVG