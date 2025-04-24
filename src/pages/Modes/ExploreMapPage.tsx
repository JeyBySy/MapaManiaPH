import React from "react"
import { LGU_PATHS } from "../../util/constants"
import { useProvince } from "../../hooks/useProvince"
import MapSVG from "../../components/MapSVG"

const ExploreMapPage: React.FC = () => {
  const { provinceOutline, provinceKeys, selectProvince } = useProvince()

  const handleClickProvince = (province: string) => {
    selectProvince(province)
  }

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex lg:flex-col-reverse flex-col items-center justify-between w-full h-full p-4">
        {/* Province outline / Map Display */}
        <div className="w-full h-[85vh] md:h-[85vh] lg:border-none overflow-hidden border">
          {provinceOutline && LGU_PATHS[provinceOutline] ? (
            <MapSVG
              provinceName={provinceOutline}
              pathsData={LGU_PATHS}
              mode="explore"
              onPathClick={(id) => console.log(`Clicked ${id}`)}
            />
          ) : (
            <p className="text-center p-4">{provinceOutline} was not found in LGU_PATHS</p>
          )}
        </div>

        {/* Province Dropdown */}
        <div className="relative z-10 w-full max-w-xs md:max-w-sm my-4 md:mt-0 rounded mx-auto ">
          <select
            name="province"
            id="provinceID"
            className="w-full dark:bg-green-600/50 bg-green-600 p-3 text-sm rounded-md max-h-60 text-center shadow"
            onChange={(e) => handleClickProvince(e.target.value)}
            defaultValue=""
          >
            {provinceKeys.map((province) => (
              <option
                key={province}
                value={province.replace(/_/g, " ")}
                onClick={() => {
                  handleClickProvince(province)
                }}>
                {province.replace(/_/g, " ")}
              </option>
            ))}

          </select>
        </div>
      </main>
    </div>
  )
}

export default ExploreMapPage
