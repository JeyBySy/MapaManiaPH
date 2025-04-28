import { useParams } from "react-router-dom";
import { LGU_PATHS } from "../../../util/constants";
import MapSVG from "../../../components/MapSVG";
import NotFound from "../../NotFound";
import { useProvince } from "../../../hooks/useProvince";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

const ProvincePage: React.FC = () => {
    const { provinceName } = useParams();
    const { getAllLocationName } = useProvince();

    const locationList = useMemo(() => {
        if (!provinceName) return [];
        return getAllLocationName(provinceName);
    }, [provinceName, getAllLocationName]);

    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(locationList[0]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:mt-14 h-fit justify-center border">
            {/* LEFT: Locations List */}
            <div className="hidden lg:flex w-full lg:w-1/4 flex-col h-[40vh] lg:h-[84vh]">
                <div className="sticky top-0 z-20 bg-gradient-to-r dark:from-green-800 dark:to-green-600/50 from-green-800/80 to-green-600 text-white font-semibold p-4 rounded-t-md shadow-md">
                    <p className="text-xs lg:text-sm uppercase tracking-wider">
                        Cities & Municipalities
                    </p>
                    <span className="text-xs bg-white text-retro-orange rounded-full px-3 py-1 font-bold shadow">
                        {locationList.length}
                    </span>
                </div>
                <div className="flex flex-col gap-2 h-full overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-b-md p-4 shadow-inner">
                    {locationList.length > 0 ? (
                        locationList.map((location, index) => {
                            const isSelected = selectedLocationId === location;
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedLocationId(location);
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

            {/* RIGHT: Map Display */}
            <div className="w-full lg:w-2/3 h-[84vh] py-5 overflow-hidden bg-transparent border relative border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex items-center justify-center">
                {provinceName && LGU_PATHS[provinceName] ? (
                    <MapSVG
                        provinceName={provinceName}
                        pathsData={LGU_PATHS}
                        selectedLocationId={selectedLocationId}
                        onPathClick={(id) => { setSelectedLocationId(id) }}
                    />
                ) : (
                    <NotFound />
                )}
            </div>
        </div>
    );
};

export default ProvincePage;