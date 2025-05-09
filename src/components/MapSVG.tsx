/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import ProvinceSkeleton from './Skeleton/ProvinceSkeleton';
import formatProvinceName from '../util/formatProvinceName';
import TypingText from './TypingText';
import { ZoomOut } from 'lucide-react';
import { SummaryRecord } from '../types/ChallengeTypes';

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
    summaryRecord
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const province = pathsData[provinceName];

    const gRef = useRef<SVGGElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const isPanning = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });
    const scaleRef = useRef(1);
    const translateRef = useRef({ x: 0, y: 0 });
    const [hasZoomed, setHasZoomed] = useState(false);

    // Handle initial map loading
    useEffect(() => {
        const loadMap = async () => {
            if (provinceName) {
                setHasZoomed(false);
                await setIsLoading(true);
                scaleRef.current = 1;
                translateRef.current = { x: 0, y: 0 };
                await new Promise((res) => setTimeout(res, 500));
                await setIsLoading(false);
                applyTransform();
            }
        };
        loadMap();
    }, [provinceName]);

    const applyTransform = () => {
        if (gRef.current) {
            const { x, y } = translateRef.current;
            const scale = scaleRef.current;
            gRef.current.setAttribute('transform', `translate(${x},${y}) scale(${scale})`);
            setHasZoomed(scale !== 1 || x !== 0 || y !== 0);
        }
    };

    // Cursor location
    const getSvgPoint = (clientX: number, clientY: number) => {
        const svg = svgRef.current;

        if (!svg) return { x: 0, y: 0 };

        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        return pt.matrixTransform(svg.getScreenCTM()?.inverse());
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        if (!isZoomable) return;
        // e.preventDefault();

        const zoomSpeed = 0.1;
        const direction = e.deltaY > 0 ? -1 : 1;
        const newScale = scaleRef.current * (1 + zoomSpeed * direction);

        const clampedScale = Math.max(0.5, Math.min(newScale, 10));

        const { x: cursorX, y: cursorY } = getSvgPoint(e.clientX, e.clientY);
        const scaleChange = clampedScale / scaleRef.current;

        translateRef.current.x = cursorX - (cursorX - translateRef.current.x) * scaleChange;
        translateRef.current.y = cursorY - (cursorY - translateRef.current.y) * scaleChange;

        scaleRef.current = clampedScale;
        applyTransform();
    };

    const resetTransform = () => {
        scaleRef.current = 1;
        translateRef.current = { x: 0, y: 0 };
        applyTransform();
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isZoomable) return;
        isPanning.current = true;
        startPoint.current = getSvgPoint(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
        if (!isZoomable) return;
        isPanning.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isZoomable || !isPanning.current) return;
        const { x, y } = getSvgPoint(e.clientX, e.clientY);
        const dx = x - startPoint.current.x;
        const dy = y - startPoint.current.y;

        translateRef.current.x += dx;
        translateRef.current.y += dy;

        startPoint.current = { x, y };
        applyTransform();
    };

    const handlePathClick = (pathId: string | undefined | null) => {
        if (!pathId || !onPathClick) return;
        onPathClick(pathId);
    };

    const handleSvgRef = (node: SVGSVGElement | null) => {
        if (node) {
            svgRef.current = node;
            if (isZoomable) {
                const stopScroll = (e: WheelEvent) => e.preventDefault();
                node.addEventListener('wheel', stopScroll, { passive: false });
                return () => {
                    node.removeEventListener('wheel', stopScroll);
                };
            }
        }
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
                        ref={handleSvgRef}
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
                                        dynamicFill = 'fill-accent';
                                    } else if (path.id && wrongGuessesRecord.includes(path.id)) {
                                        dynamicFill = 'fill-red-400';
                                    } else if (path.id && currentGuessRecord.includes(path.id)) {
                                        dynamicFill = 'fill-retro-mint';
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
                                        stroke="black"
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

                    {(mode === 'summary' || mode === 'explore') && (
                        <div className='w-full bg-transparent flex items-center justify-center'>
                            <p className="text-center text-[55%] sm:text-sm p-2 break-words line-clamp-2">
                                {formatProvinceName(provinceName)}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MapSVG;
