import React from 'react'

const ProvinceSkeleton: React.FC = () => {
    return (
        <div className="w-full h-full relative flex items-center justify-center animate-pulse ">
            <div className="text-white text-center flex flex-col justify-center items-center gap-2 lg:gap-5">
                <div className="text-[40%] lg:text-base">Loading province outline...</div>
                <div className="w-10 h-10 lg:w-16 lg:h-16 border-4 lg:border-8 border-retro-yellow border-dashed rounded-full animate-spin mx-auto " />
            </div>
        </div>
    )
}

export default ProvinceSkeleton
