/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import ProvinceSkeleton from './Skeleton/ProvinceSkeleton';
import formatProvinceName from '../util/formatProvinceName';
import TypingText from './TypingText';
import { ZoomOut } from 'lucide-react';

interface SVGProps {
    provinceName: string;
    pathsData: LGU_PATH_TYPE;
    mode?: 'guess' | 'explore';
    isSubmitted?: boolean;
    correctGuesses?: [string, string][];
    onPathClick?: (id: string) => void;
    selectedLocationId?: string | null;
    isZoomable?: boolean;
}

const MapSVG: React.FC<SVGProps> = ({
    provinceName,
    pathsData,
    mode,
    isSubmitted = true,
    correctGuesses = [],
    onPathClick,
    selectedLocationId,
    isZoomable = false,
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


    useEffect(() => {
        const loadMap = async () => {
            if (provinceName) {
                setHasZoomed(false)
                setIsLoading(true);
                scaleRef.current = 1;
                translateRef.current = { x: 0, y: 0 };
                await new Promise((res) => setTimeout(res, 500));
                setIsLoading(false);
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
            setHasZoomed(scale !== 1 || x !== 0 || y !== 0); // Track if zoomed or panned
        }
    };

    const svgPoint = (event: React.WheelEvent<SVGSVGElement>) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };

        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;

        const cursorPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        return { x: cursorPt.x, y: cursorPt.y };
    };


    const getSvgPoint = (clientX: number, clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };

        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        return cursor;
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        if (!isZoomable) return;

        e.preventDefault();

        const zoomSpeed = 0.1;
        const direction = e.deltaY > 0 ? -1 : 1;

        const newScale = scaleRef.current * (1 + zoomSpeed * direction);
        const clampedScale = Math.max(0.5, Math.min(newScale, 10));

        const { x: cursorX, y: cursorY } = svgPoint(e);
        const scaleChange = clampedScale / scaleRef.current;

        // Adjust translation to keep the zoom centered at the cursor
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
        const { x, y } = getSvgPoint(e.clientX, e.clientY);
        startPoint.current = { x, y };
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

    const handleMouseUp = () => {
        if (!isZoomable) return;
        isPanning.current = false;
    };




    if (!province) return null;

    const isGuessMode = mode === 'guess';
    const isExploreMode = mode === 'explore';

    return (
        <>
            {isLoading ? (
                <ProvinceSkeleton />
            ) : (
                <div className="flex flex-col items-center justify-between h-full w-full">
                    {/* For Explorer location name */}
                    <div className="w-full text-start px-5 lg:pb-10 h-0 ">
                        <TypingText
                            text={selectedLocationId}
                            isSubmitted={true}
                            isMasked={false}
                            className={`text-green-500 text-sm lg:text-2xl text-shadow`}
                        />
                    </div>
                    {isZoomable && hasZoomed && (
                        <button
                            title='Reset Zoom'
                            onClick={(e) => {
                                (e.currentTarget as HTMLButtonElement).blur()
                                resetTransform()
                            }}
                            className="z-50 mb-2 px-2 py-2 cursor-pointer dark:text-white text-neutral-700 dark:bg-retro-bg  bg-white rounded-md transition absolute bottom-4 right-4"
                        >
                            <ZoomOut />
                        </button>
                    )}

                    <svg
                        ref={svgRef}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-full flex-1 ${isGuessMode && !isSubmitted ? 'pointer-events-none' : 'pointer-events-auto'}`}
                        viewBox={province.viewBox || '0 0 100 100'}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <g ref={gRef}>
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
                        </g>
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
};

export default MapSVG;
