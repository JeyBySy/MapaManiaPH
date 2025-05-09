import { Link } from "react-router-dom"
import React, { useState } from "react"
import Footer from "../components/Footer"
import Button from "../components/Button"
import PopUp from "../components/PopUp/PopUp"
import DarkModeToggle from "../components/DarkModeToggle"
import { CircleHelp, Settings } from "lucide-react"

const StartPage: React.FC = () => {
  const [toggleSetting, setToggleSetting] = useState(false)
  const [toggleHelp, setToggleHelp] = useState(false)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center m-auto">
      <div className=" lg:container m-2 flex flex-col items-center justify-center border-4 border-dashed py-20 relative">

        {/* Settings */}
        <PopUp showExitBtn={true} visible={toggleSetting} onClose={() => { setToggleSetting(false) }}>
          <div className="bg-gray-100 dark:bg-gray-900 text-white  mx-auto lg:w-xl lg:min-w-[400px] w-[87%] h-fit rounded-md border-2 border-gray-300 shadow relative">
            {/* Header */}
            <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-t-sm">
              <h2 className="text-xs lg:text-lg font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                Settings
              </h2>
            </div>

            {/* Content */}
            <div className="flex text-xs gap-2 max-h-[80vh] text-wrap overflow-y-auto ">

              <div className="flex flex-col gap-2 p-8 w-full">
                <div className="flex flex-row dark:text-gray-600 text-gray-700 items-center space-x-10 justify-between text-shadow-xs">
                  <p>Dark Mode: </p>
                  <DarkModeToggle />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-400  dark:bg-gray-600 rounded-b-sm text-center">
              <button onClick={() => { setToggleSetting(false) }} className="cursor-pointer px-4 py-4 text-sm">Close</button>
            </div>
          </div>
        </PopUp>

        {/* Info */}
        <PopUp showExitBtn={true} visible={toggleHelp} onClose={() => { setToggleHelp(false) }}>
          <div className="bg-gray-100 dark:bg-gray-900 text-white  mx-auto lg:w-xl lg:min-w-[400px] w-[87%] h-fit rounded-md border-2 border-gray-300 shadow relative">
            {/* Header */}
            <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-t-sm">
              <h2 className="text-xs lg:text-lg font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                Settings
              </h2>
            </div>
            {/* Content */}
            <div className="flex text-xs gap-2 max-h-[80vh] text-wrap overflow-y-auto ">
              <div className="flex flex-col gap-4 p-8 w-full text-gray-700 dark:text-gray-300 overflow-y-auto h-[800px]">
                <p>
                  Welcome to the <span className="font-semibold">Interactive Map Challenge</span>!
                  In this game, you can <strong>explore</strong> and <strong>guess</strong> the different regions of the Philippines.
                </p>
                <div className="flex flex-col gap-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ex mollitia aperiam aspernatur ad. Harum et suscipit sunt pariatur vero. Natus, nulla. Repellat minus sed fuga blanditiis facere sint sapiente.
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="bg-gray-400  dark:bg-gray-600 rounded-b-sm text-center">
              <button onClick={() => { setToggleHelp(false) }} className="cursor-pointer px-4 py-4 text-sm">Close</button>
            </div>
          </div>
        </PopUp>

        <div className="w-full flex absolute top-0 right-0 justify-end">
          <div className=" p-3">
            <CircleHelp onClick={() => { setToggleHelp(true) }} className="text-white/80 hover:text-white cursor-pointer" />
          </div>
          <div className=" p-3">
            <Settings onClick={() => { setToggleSetting(true) }} className="text-white/80 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white py-5 px-2 ">
            _MapaManiaPH_
          </h1>
          <p className="lg:text-sm text-[10px] mx-4 text-center text-gray-300 mb-6">
            Challenge your knowledge of the Philippine map!
          </p>
        </div>
        <div className="lg:w-1/3 w-full px-2 flex flex-col gap-4  mx-auto">
          <Link to={"/quickstart"}>
            <div className="button bg-gradient-to-b from-sky-400 to-sky-700 opacity-90 hover:opacity-100">
              <Button
                icon="🇵🇭"
                btnName="Quick Start" />
            </div>
          </Link>

          <Link to={"/exploremap"}>
            <div className="bg-gradient-to-b from-emerald-400 to-emerald-700 button opacity-90 hover:opacity-100">
              <Button
                icon='🌍'
                btnName="Explore Map"
              />
            </div>
          </Link>

          <Link to={"/challenge"}>
            <div className="bg-gradient-to-b from-red-400 to-red-500 button opacity-90 hover:opacity-100">
              <Button
                icon='⏱️'
                btnName=" Challenge Mode"
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
                />
              </div>
              {/* bg-amber-600 hover:bg-amber-700 */}
            </Link>
          </div>


        </div>
      </div >
      <Footer />
    </div>
  )
}

export default StartPage
