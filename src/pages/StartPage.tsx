import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import React from "react";
import Footer from "../components/Footer";

const StartPage: React.FC = () => {
    return (
        <>
            <div className="lg:container m-2 flex flex-col items-center justify-center border-4 border-dashed py-20 relative">
                <div className="w-full">
                    <motion.h1
                        className="lg:text-6xl text-3xl font-bold text-center text-white py-5 px-2">
                        MapaMania
                    </motion.h1>
                    <p className="lg:text-sm text-[10px] mx-4 text-center text-gray-300 mb-6">
                        Challenge your knowledge of the Philippine map!
                    </p>
                </div>
                <div className="lg:w-1/3 w-full px-2 flex flex-col gap-4  mx-auto">
                    <Link to="/quickstart">
                        <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition">
                            🇵🇭 Quick Start
                        </button>
                    </Link>
                    <Link to={"/exploremap"}>
                        <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition">
                            🌍 Explore Map
                        </button>
                    </Link>
                    <Link to={"/challenge"}>
                        <button className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white py-3 rounded-md transition">
                            ⏱️ Challenge Mode
                        </button>
                    </Link>
                    <Link to={"/multiplayer"}>
                        <button
                            disabled
                            className="w-full cursor-not-allowed pointer-events-auto bg-gray-900 text-gray-600 py-3 rounded-md transition"
                        >
                            {/* 🔥 PvP */}
                            {/* bg-amber-600 hover:bg-amber-700 */}
                            <div className="line-through">
                                🔒 Multiplayer
                            </div>
                        </button>
                    </Link>


                </div>

            </div>
            <Footer />
        </>

    );
};

export default StartPage;
