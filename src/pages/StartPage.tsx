import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Footer from "../components/Footer";
import PopUp from "../components/PopUp";

const StartPage: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    return (
        <>
            <PopUp
                visible={showPopup}
                onClose={() => setShowPopup(false)}
                title="Typing Challenge"
            >
                <div className="flex flex-row gap-2">
                    <div className="border w-full text-center p-10 cursor-pointer">
                        Typing
                    </div>
                    <div className="border w-full text-center p-10 cursor-pointer">
                        Multiple Choice
                    </div>
                </div>
            </PopUp>
            <div className="lg:container m-2 flex flex-col items-center justify-center border-4 border-dashed py-20 relative">

                <div className="w-full">
                    <motion.h1
                        className="lg:text-6xl text-3xl font-bold text-center text-white py-5 px-2">
                        _!_MapaMania_!_
                    </motion.h1>
                    <p className="lg:text-sm text-[10px] mx-4 text-center text-gray-300 mb-6">
                        Challenge your knowledge of the Philippine map!
                    </p>
                </div>
                <div className="lg:w-1/3 w-full px-2 flex flex-col gap-4  mx-auto">


                    {/* <Link to="/quickstart">
                        <button className="w-full cursor-pointer bg-gradient-to-b from-sky-500 to-sky-800 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-md transition shadow-2xl">
                            🇵🇭 Quick Start
                        </button>
                    </Link> */}

                    <button onClick={() => setShowPopup(true)} className="w-full cursor-pointer bg-gradient-to-b from-sky-500 to-sky-800 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-full transition shadow-2xl">
                        🇵🇭 Quick Start
                    </button>

                    <Link to={"/exploremap"}>
                        <button className="w-full cursor-pointer bg-gradient-to-b from-emerald-500 to-emerald-800 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition shadow-2xl">
                            🌍 Explore Map
                        </button>
                    </Link>
                    <Link to={"/challenge"}>
                        <button className="w-full cursor-pointer bg-gradient-to-b from-red-500 to-red-800 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full transition shadow-2xl">
                            ⏱️ Challenge Mode
                        </button>
                    </Link>

                    {/* Not yet sure to include feature lol */}
                    <div className="relative cursor-not-allowed pointer-events-auto">
                        <div className="absolute z-10 w-full h-full flex items-center justify-center text-lg backdrop-blur-[2px]" >
                            🔒
                        </div>
                        <Link to={"/multiplayer"}>
                            <button
                                disabled
                                className="w-full bg-gradient-to-b from-gray-500 to-gray-800 bg-gray-900 text-white py-3 rounded-full transition shadow-2xl"
                            >
                                {/* 🔥 PvP */}
                                {/* bg-amber-600 hover:bg-amber-700 */}
                                <div className="line-through ">
                                    🔥 Multiplayer
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    );
};

export default StartPage;
