import React from 'react'
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';


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

    const province = pathsData[provinceName];

    if (!province) return null;
    const isGuessMode = mode === 'guess';
    return (
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
                const fillClass = isPathnCorrect ? 'fill-accent' : `${hoverFill} fill-gray-50 dark:fill-gray-200`;

                return (
                    <path
                        key={path.id || index}
                        id={path.id || undefined}
                        d={path.d}
                        className={`map_svg  ${fillClass}`}
                        stroke="black"
                        onClick={(e) => {
                            e.preventDefault();
                            if (path.id && onPathClick) {
                                onPathClick(path.id);
                            }
                        }}
                    />
                );
            })}
        </svg>
    )
}

export default MapSVG