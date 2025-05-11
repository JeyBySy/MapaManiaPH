import React, { useState } from "react"
import { LGU_PATHS } from "../../../util/constants"
import MapSVG from "../../../components/MapSVG"
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";

const ExploreMapPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const normalizedPath = location.pathname.replace(/\/+$/, "")
  const isProvincePage = normalizedPath !== "/exploremap"

  const [searchTerm, setSearchTerm] = useState("");

  const handlePathClick = (province: string) => {
    navigate(`/exploremap/${province}`)
  }

  // Filter provinces based on search term
  const filteredProvinces = Object.keys(LGU_PATHS).filter((province) =>
    province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[92dvh] grid grid-rows-[1fr_auto]">
      <main className="flex container mx-auto flex-col justify-between w-full h-fit lg:p-4">
        {!isProvincePage && (
          <>
            <div className="w-full mx-auto px-5 flex items-center lg:justify-end justify-center">
              <input
                className="p-2 rounded border w-full lg:w-fit"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full h-full grid grid-cols-3 lg:grid-cols-5 gap-4 p-4">
              {filteredProvinces.length > 0 ? (
                filteredProvinces.map((province) => (
                  <div
                    onClick={() => { handlePathClick(province) }}
                    key={province}
                    className="w-full h-[170px] lg:h-[300px] pt-5 px-2 border shadow rounded-md overflow-hidden cursor-pointer dark:hover:bg-gray-700/50 hover:bg-retro-mint/10 hover:shadow-2xl"
                  >
                    <MapSVG
                      provinceName={province}
                      pathsData={LGU_PATHS}
                      mode="explore"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full h-[75vh] flex items-center justify-center text-center darK:text-gray-500 py-10">
                  No province found.
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ExploreMapPage
