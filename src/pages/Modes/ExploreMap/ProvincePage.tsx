import { useNavigate, useParams } from "react-router-dom"
import { LGU_PATHS } from "../../../util/constants"
import MapSVG from "../../../components/MapSVG"
import formatProvinceName from "../../../util/formatProvinceName"
// import { useProvince } from "../../../hooks/useProvince"

const ProvincePage: React.FC = () => {
    const { provinceName } = useParams()
    const navigate = useNavigate()

    const handleBackButton = () => {
        navigate(`/exploremap`)
    }

    return (
        <>
            <button onClick={() => { handleBackButton() }}>
                Back
            </button>

            <div className="w-full h-[85vh] md:h-[85vh] lg:border-none overflow-hidden border">
                {provinceName && LGU_PATHS[provinceName] ? (
                    <>
                        <span>{formatProvinceName(provinceName?.toString())}</span>
                        <MapSVG
                            provinceName={provinceName}
                            pathsData={LGU_PATHS}
                            mode="explore"
                            onPathClick={(id) => console.log(`Clicked ${id}`)}
                        />

                    </>
                ) : (
                    <p className="text-center p-4">{provinceName} was not found in LGU PATHS</p>
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

