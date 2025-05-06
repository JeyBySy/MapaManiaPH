import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import React, { useRef, useState } from "react";
import TypingText from "./TypingText";

interface LocationListProps {
    submitted: boolean;
    typedText: string;
    locationName: string[];
    currentLocationStep: number;
    correctGuesses: [string, string][];
    provinceOutline: string;
}

const LocationList: React.FC<LocationListProps> = ({
    submitted,
    typedText,
    locationName,
    currentLocationStep,
    correctGuesses,
    provinceOutline,
}) => {

    const [isCollapsed, setIsCollapsed] = useState(true)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div className={`w-full fixed bottom-0 lg:static lg:w-4/12 flex-col lg:h-[80vh] z-50 ${submitted ? 'lg:flex' : 'hidden'}`}>
            <div className="dark:bg-slate-600 bg-blue-400 text-white font-semibold shadow-md lg:rounded-t-md flex flex-col justify-between items-center z-40">
                <p className="text-xs lg:text-sm hidden lg:block uppercase tracking-wider p-4">
                    Guess the Location
                </p>
                <div className="text-xs lg:text-sm tracking-wider lg:hidden w-full">
                    {locationName[currentLocationStep] === undefined ? (
                        <p className="text-center text-base py-4.5">
                            Complete
                        </p>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full gap-2 py-2">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`location-${currentLocationStep}`}
                                    className="text-base capitalize flex gap-1 "
                                    initial={{ y: -15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeInOut",
                                        duration: 0.2
                                    }}
                                >
                                    <MapPin className={`transition-all w-5 h-5 text-neutral-100`} />
                                    {locationName[currentLocationStep]}
                                </motion.p>
                            </AnimatePresence>
                            <p className="text-[10px] dark:text-neutral-300 tracking-wider">
                                Guess the Location
                            </p>
                        </div>
                    )}
                </div>
                <button
                    title="Show All"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="absolute  right-0 p-4 text-white hover:text-gray-300 transition-transform cursor-pointer rounded lg:hidden"
                >
                    <ChevronDown className={`w-6 h-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                    />
                </button>
                <div className={`w-full transition-all duration-300 ease-in-out flex flex-col gap-2 lg:max-h-none lg:h-full lg:p-2 border overflow-hidden  bg-neutral-200 dark:bg-gray-800 border-gray-300 dark:border-gray-500 shadow-inner  
                ${isCollapsed
                        ? 'max-h-0 p-0'
                        : 'max-h-[35dvh] p-2 overflow-y-auto lg:max-h-none'}`
                }>

                    {submitted && typedText.length !== 0 ? (
                        locationName.map((path, index) => {
                            const isCurrentStep = index === currentLocationStep
                            const isLocationCorrect = correctGuesses.some(([id]) => id === path)
                            return (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        itemRefs.current[index] = el
                                    }}
                                    className={`z-40 flex items-center gap-3 p-2 lg:p-3 border border-gray-300 dark:border-gray-500 rounded-md transition-all shadow text-shadow-2xs 
                                        ${isCurrentStep
                                            ? " bg-neutral-50 text-gray-400 cursor-pointer dark:bg-gray-200 dark:text-gray-600 "
                                            : isLocationCorrect ? "text-retro-mint-text dark:text-white bg-retro-mint dark:bg-retro-purple"
                                                : "text-gray-400/20 bg-gray-300 dark:bg-gray-700/40 dark:text-gray-500"}`}>
                                    <MapPin className={`transition-all  w-6 h-6 ${isLocationCorrect ? "dark:text-neutral-600 text-retro-mint-text" : "dark:text-neutral-600 text-gray-400"}`} />
                                    <TypingText
                                        text={path}
                                        isSubmitted={true}
                                        isMasked={false}
                                        className="text-xs lg:text-sm capitalize"
                                    />
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center text-sm italic text-gray-400">
                            <TypingText
                                text={provinceOutline.toString()}
                                isSubmitted={submitted}
                                isMasked={true}
                                className={`lg:text-sm py-4  px-2 text-xs text-shadow-xs ${!submitted
                                    ? "text-gray-500/0 dark:text-white/40"
                                    : "text-accent"
                                    }`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default LocationList;
