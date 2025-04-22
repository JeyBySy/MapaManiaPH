import { Link } from "react-router-dom"
import React, { useState } from "react"
import Footer from "../components/Footer"
import Button from "../components/Button"
import PopUp from "../components/PopUp/PopUp"
import DarkModeToggle from "../components/DarkModeToggle"
import { Settings } from "lucide-react"

const StartPage: React.FC = () => {
  const [toggleSetting, setToggleSetting] = useState(false)
  return (
    <>
      <div className="container m-2 flex flex-col items-center justify-center border-4 border-dashed py-20 relative">
        <PopUp visible={toggleSetting} onClose={() => { setToggleSetting(false) }} title="Settings">
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex flex-row dark:text-gray-600 text-gray-700 items-center space-x-10 justify-between text-shadow">
              <p>Dark Mode: </p>
              <DarkModeToggle />
            </div>
          </div>
        </PopUp>
        <div className="absolute top-0 right-0 p-3">
          <Settings onClick={() => { setToggleSetting(true) }} className="text-white/80 hover:text-white cursor-pointer" />
        </div>
        <div className="w-full">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white py-5 px-2">
            _MapaManiaPH_
          </h1>
          <p className="lg:text-sm text-[10px] mx-4 text-center text-gray-300 mb-6">
            Challenge your knowledge of the Philippine map!
          </p>
        </div>
        <div className="lg:w-1/3 w-full px-2 flex flex-col gap-4  mx-auto">
          <Link to={"/quickstart"}>
            <div className="button bg-gradient-to-b from-sky-400 to-sky-700 opacity-90 hover:opacity-100">
              <Button icon="🇵🇭" btnName="Quick Start" event={() => { }} />
            </div>
          </Link>

          <Link to={"/exploremap"}>
            <div className="bg-gradient-to-b from-emerald-400 to-emerald-700 button opacity-90 hover:opacity-100">
              <Button
                icon='🌍'
                btnName="Explore Map"
                event={() => { }}
              />
            </div>
          </Link>

          <Link to={"/challenge"}>
            <div className="bg-gradient-to-b from-red-400 to-red-500 button opacity-90 hover:opacity-100">
              <Button
                icon='⏱️'
                btnName=" Challenge Mode"
                event={() => { }}
              />
            </div>
          </Link>

          {/* Not yet sure to include feature lol */}
          <div className="relative cursor-not-allowed pointer-events-auto">
            <div className="absolute z-10 w-full h-full flex items-center justify-center text-lg rounded-full backdrop-blur-[2px]">
              🔒
            </div>
            <Link to={"/multiplayer"}>
              <div className="bg-gradient-to-b from-gray-400 to-gray-500 button opacity-90 hover:opacity-100">
                <Button
                  icon='⏱🔥'
                  btnName="Multiplayer"
                  event={() => { }}
                />
              </div>
              {/* bg-amber-600 hover:bg-amber-700 */}
            </Link>
          </div>


        </div>
      </div >
      <Footer />
    </>
  )
}

export default StartPage
