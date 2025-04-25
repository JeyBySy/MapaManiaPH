import { useParams } from "react-router-dom"
import { LGU_PATHS } from "../../../util/constants"
import MapSVG from "../../../components/MapSVG"
import NotFound from "../../NotFound"
// import { useProvince } from "../../../hooks/useProvince"

const ProvincePage: React.FC = () => {
    const { provinceName } = useParams()

    return (
        <>
            <div className="w-full h-[85vh] md:h-[85vh] lg:border-none overflow-hidden border">
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

