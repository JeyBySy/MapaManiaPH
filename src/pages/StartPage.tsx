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
          <div className="text-xs lg:text-base bg-neutral-300 dark:bg-gray-900 text-white  mx-auto lg:w-[30vw] w-[90vw] h-fit rounded-md border-2 border-gray-300 shadow relative text-[50%]">
            {/* Header */}
            <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-t-sm">
              <h2 className=" font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                Settings
              </h2>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4 w-full  text-gray-700 dark:text-gray-300 overflow-y-auto">
              <div className="flex flex-col gap-2 p-6 w-full">
                <div className="flex flex-row w-full dark:text-gray-600 text-gray-700 items-center justify-between text-shadow-xs">
                  <p className="text-xs">Dark Mode: </p>
                  <DarkModeToggle />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-400  dark:bg-gray-600 rounded-b-sm text-center">
              <button onClick={() => { setToggleSetting(false) }} className="cursor-pointer px-4 py-4">Close</button>
            </div>
          </div>
        </PopUp>
        {/* Info */}
        <PopUp showExitBtn={true} visible={toggleHelp} onClose={() => { setToggleHelp(false) }}>
          <div className="text-xs lg:text-base bg-neutral-300 dark:bg-gray-900 text-white  mx-auto  w-[90dvw]  h-fit rounded-md border-2 border-gray-300 shadow relative text-[50%]">
            {/* Header */}
            <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-t-sm">
              <h2 className="font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                Instruction
              </h2>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4 p-4 w-full text-gray-700 dark:text-gray-300 overflow-y-auto h-[70dvh]">
              <div className="flex flex-col gap-6 w-full text-gray-800 dark:text-gray-100 text-[10px] lg:text-base">
                <h3 className="font-bold text-center text-blue-600 dark:text-blue-300 mb-2 uppercase tracking-wider">
                  Welcome to the Interactive Map Challenge!
                </h3>

                <p>
                  Test your knowledge of Philippine geography by identifying and guessing different provinces.
                  This interactive and educational game helps you learn while having fun.
                </p>

                <div>
                  <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    🎯 Objective:
                  </h4>
                  <p>
                    Guess as many provinces correctly as you can based on the highlighted region on the map.
                    Every correct answer brings you closer to mastery. But beware—incorrect guesses cost you lives!
                  </p>
                </div>
                <hr />
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">
                    🕹️ Game Modes:
                  </h4>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li><strong>Challenge Mode:</strong> Guess provinces with limited lives.</li>
                    <li><strong>Explore Mode:</strong> Browse the map freely to learn without pressure.</li>
                    <li><strong>Summary Mode:</strong> Review your correct and incorrect guesses after each session.</li>
                  </ul>
                </div>
                <hr />
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-1">
                    📋 How to Play:
                  </h4>
                  <ul className="list-decimal list-inside pl-2 space-y-1">
                    <li>A province is highlighted on the map.</li>
                    <li>Type your guess and submit.</li>
                    <li>If correct, move to the next province.</li>
                    <li>If wrong, you lose a life.</li>
                    <li>Game ends when you run out of lives or complete all provinces.</li>
                  </ul>
                </div>
                <hr />
                <div >
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                    💡 Tips:
                  </h4>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>Study province shapes and their positions on the map.</li>
                    <li>Use Explore Mode to practice before attempting Challenge Mode.</li>
                  </ul>
                </div>

                <p className="text-center font-medium text-green-700 dark:text-green-300">
                  Ready to explore and conquer the map? Let’s go! 🇵🇭
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-400  dark:bg-gray-600 rounded-b-sm text-center">
              <button onClick={() => { setToggleHelp(false) }} className="cursor-pointer px-4 py-4">Close</button>
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
