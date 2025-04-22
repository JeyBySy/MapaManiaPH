import React from "react"
import { LGU_PATHS } from "../../util/constants"
import { useProvince } from "../../hooks/useProvince"

const ExploreMapPage: React.FC = () => {
  const { provinceOutline, provinceKeys, selectProvince } = useProvince(false)

  const handleClickProvince = (province: string) => {
    selectProvince(province)
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side: Province List */}
      <aside className="w-1/6 border-dashed border-r-4 overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4 bg-gray-800 p-5">
          Provinces
        </h2>
        <div className="flex flex-col">
          <ul className="text-xs flex flex-col gap-1 py-2 bg-gray-700">
            {provinceKeys.map((province) => (
              <li
                key={province}
                onClick={() => {
                  handleClickProvince(province)
                }}
                className={`hover:bg-gray-500 cursor-pointer p-3 capitalize ${provinceOutline === province ? "bg-gray-500" : ""
                  }`}
              >
                {province.replace(/_/g, " ").toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right side: SVG Map Container */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full h-full p-4 border">
          {provinceOutline && LGU_PATHS[provinceOutline] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox={LGU_PATHS[provinceOutline]?.viewBox || "0 0 100 100"}
            >
              {LGU_PATHS[provinceOutline]?.paths.map((path, index) => (
                <path
                  key={path.id || index}
                  id={path.id || undefined}
                  d={path.d}
                  fill="auto"
                  className={`map_svg fill-gray-50 dark:fill-gray-200/90 hover:fill-green-400`}
                  stroke="black"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(`Clicked on ${path.id || index}`)
                  }}
                />
              ))}
            </svg>
          ) : (
            `${provinceOutline} was not found in LGU_PATHS`
          )}
        </div>
      </main>
    </div>
  )
}

export default ExploreMapPage
