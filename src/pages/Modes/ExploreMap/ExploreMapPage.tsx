import React from "react"
import { LGU_PATHS } from "../../../util/constants"
import MapSVG from "../../../components/MapSVG"
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";

const ExploreMapPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const normalizedPath = location.pathname.replace(/\/+$/, "")
  const isProvincePage = normalizedPath !== "/exploremap"

  const handlePathClick = (province: string) => {
    navigate(`/exploremap/${province}`)
  }

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex container mx-auto flex-col justify-between w-full h-full p-4">
        <Outlet />
        {!isProvincePage && (
          <>
            <div className="w-full mx-auto px-5 lg:mt-10 flex items-center lg:justify-end justify-center">
              <input className="p-2 rounded border w-full lg:w-fit" type="text" placeholder="Search" />
            </div>
            <div className="w-full h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
              {Object.keys(LGU_PATHS).map((province) => (
                <div
                  onClick={() => { handlePathClick(province) }}
                  key={province}
                  className="w-full h-[300px] py-8 border rounded-md shadow-md overflow-hidden cursor-pointer dark:hover:bg-gray-700/50 hover:bg-retro-mint/20"
                >
                  <MapSVG
                    provinceName={province}
                    pathsData={LGU_PATHS}
                    mode="explore"
                    onPathClick={(id) => console.log(`Clicked ${id} in ${province}`)}
                  />
                  {/* <p className="text-center text-sm font-medium mt-1">{formatProvinceName(province)}</p> */}
                </div>
              ))}
            </div>
          </>
        )}
        <Footer />
      </main>
    </div>
  )
}

export default ExploreMapPage
