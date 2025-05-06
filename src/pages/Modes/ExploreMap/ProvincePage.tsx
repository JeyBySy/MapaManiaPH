import { useParams } from "react-router-dom";
import { LGU_PATHS } from "../../../util/constants";
import MapSVG from "../../../components/MapSVG";
import NotFound from "../../NotFound";
import { useProvince } from "../../../hooks/useProvince";
import { useMemo, useRef, useState } from "react";
import { MapPin, Map } from "lucide-react";
import Footer from "../../../components/Footer";

const ProvincePage: React.FC = () => {
    const { provinceName } = useParams();
    const { getAllLocationName } = useProvince();
    const provinceDivRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isLocationShow, setIsLocationShow] = useState(false)

    const handleLocationShow = () => {
        setIsLocationShow((prev) => !prev)
    }

    const locationList = useMemo(() => {
        if (!provinceName) return [];
        return getAllLocationName(provinceName);
    }, [provinceName, getAllLocationName]);

    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(locationList[0]);

    const handlePathClick = (pathId: string) => {
        if (provinceDivRefs.current[pathId]) {
            provinceDivRefs.current[pathId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
        setSelectedLocationId(pathId);
    };

    return (
        <div className="grid grid-rows-1">
            <div className="flex flex-col md:flex-row lg:container lg:mx-auto gap-2 h-fit justify-center relative">
                <button
                    title="Show All"
                    className=" lg:hidden p-4 fixed bottom-5 right-5 rounded-full dark:bg-green-800 dark:hover:bg-green-700 shadow-2xl bg-gray-400 z-50 cursor-pointer "
                    onClick={(e) => {
                        e.preventDefault()
                        handleLocationShow()
                    }}
                >
                    {isLocationShow ? (
                        <Map className={`transition-all  w-6 h-6 dark:text-neutral-100 text-gray-400`} />
                    ) : (
                        <MapPin className={`transition-all  w-6 h-6 dark:text-neutral-100 text-gray-400`} />
                    )}
                </button>

                {/* LEFT: Locations List */}
                <div className={`lg:flex w-full lg:w-1/3 flex-col lg:h-[84vh] lg:static z-30 h-full overflow-y-auto 
                ${isLocationShow ? "h-full mx-auto fixed top-0 z-40" : "hidden "}
                `}>
                    <div className="sticky top-0 z-20 bg-gradient-to-r dark:bg-slate-600 bg-blue-400 text-white font-semibold p-4 lg:rounded-t-md shadow-md">
                        <p className="text-xs lg:text-sm tracking-wider">
                            Cities/Municipalities
                        </p>
                        <span className="text-[10px] text-retro-orange rounded-full font-bold shadow">
                            {locationList.length}
                        </span>
                    </div>
                    <div className="min-h-[92dvh] lg:h-full lg:min-h-auto overflow-y-auto bg-neutral-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 lg:rounded-b-md p-4 shadow-inner">
                        <div className="flex flex-col gap-2 ">
                            {locationList.length > 0 ? (
                                locationList.map((location, index) => {
                                    const isSelected = selectedLocationId === location;
                                    return (
                                        <div
                                            key={index}
                                            ref={(el) => {
                                                if (el) {
                                                    provinceDivRefs.current[location] = el;
                                                }
                                            }}
                                            tabIndex={index}
                                            onClick={() => {
                                                setSelectedLocationId(location);
                                                handlePathClick(location);
                                            }}
                                            className={`flex items-center gap-3 p-3 border rounded-md transition-all cursor-pointer group
                                        ${isSelected ? 'bg-green-200 dark:bg-green-700 border-green-400 dark:border-green-500' : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'}
                                        hover:bg-green-100 dark:hover:bg-green-600`}
                                        >
                                            <MapPin
                                                className={`text-retro-orange transition-all ${isSelected ? 'text-green-800 dark:text-green-300' : 'group-hover:text-green-700 dark:group-hover:text-green-300'} w-6 h-6`}
                                            />
                                            <p className={`text-xs sm:text-xs transition-all capitalize ${isSelected ? 'text-green-900 dark:text-green-200 ' : 'text-gray-700 dark:text-gray-200 group-hover:text-green-800 dark:group-hover:text-green-200'}`}>
                                                {location}
                                            </p>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="text-center text-sm italic text-gray-400 mt-8">
                                    -- No locations found --
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Map Display */}
                <div className="w-[95%] lg:w-full h-[84dvh] mx-auto overflow-hidden bg-transparent border relative border-gray-300 dark:border-gray-500 rounded-lg shadow-lg flex items-center justify-center ">
                    {provinceName && LGU_PATHS[provinceName] ? (
                        <MapSVG
                            provinceName={provinceName}
                            pathsData={LGU_PATHS}
                            mode="explore"
                            selectedLocationId={selectedLocationId}
                            onPathClick={(id) => { handlePathClick(id) }}
                            isZoomable={true}
                        />
                    ) : (
                        <NotFound />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProvincePage;