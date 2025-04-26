import { useParams } from "react-router-dom"
import { LGU_PATHS } from "../../../util/constants"
import MapSVG from "../../../components/MapSVG"
import NotFound from "../../NotFound"
import { useProvince } from "../../../hooks/useProvince"
import { useMemo } from "react"

const ProvincePage: React.FC = () => {
    const { provinceName } = useParams()
    const { getAllLocationName } = useProvince();

    const locationList = useMemo(() => {
        if (!provinceName) return [];
        return getAllLocationName(provinceName);
    }, [provinceName, getAllLocationName]);

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row lg:mt-14">
                {/* LEFT: Locations List */}
                <div className="w-full lg:w-fit border p-4 relative h-[50vh] lg:h-[85vh]">
                    <div className="w-full h-full overflow-y-auto border p-4 shadow bg-black text-green-400 font-mono rounded space-y-3">
                        {locationList.length > 0 ? (
                            locationList.map((location, index) => (
                                <div
                                    key={index}
                                    className="text-[12px] md:text-sm break-words pl-6 relative before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-green-400 before:rounded-sm"
                                >
                                    {location}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm italic text-gray-500 font-mono text-center">-- No locations found --</div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Map */}
                <div className="w-full h-[50vh] lg:h-[85vh] overflow-hidden border">
                    {provinceName && LGU_PATHS[provinceName] ? (
                        <MapSVG
                            provinceName={provinceName}
                            pathsData={LGU_PATHS}
                            mode="explore"
                            onPathClick={(id) => console.log(`Clicked ${id}`)}
                        />
                    ) : (
                        <NotFound />
                    )}
                </div>
            </div>

            {/* Choose province in dropdown*/}
            {/* <div className="relative z-10 w-full max-w-xs md:max-w-sm my-4 md:mt-0 rounded mx-auto ">
                <select
                    name="province"
                    id="provinceID"
                    className="w-full dark:bg-green-600/50 bg-green-600 p-3 text-sm rounded-md max-h-60 text-center shadow"
                    onChange={(e) => {
                        const selected = e.target.value.replace(/ /g, "_")
                        selectProvince(selected)
                        window.location.href = `/exploremap/${selected}`
                    }}
                    defaultValue={provinceName?.replace(/_/g, " ")}
                >
                    {provinceKeys.map((province) => (
                        <option key={province} value={province.replace(/_/g, " ")}>
                            {province.replace(/_/g, " ")}
                        </option>
                    ))}
                </select>
            </div> */}
        </>
    )
}

export default ProvincePage
