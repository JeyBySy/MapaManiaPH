import React from 'react'

const ProvinceSkeleton: React.FC = () => {
    return (
        <div className="w-full md:w-4xl h-full relative flex items-center justify-center mb-6 py-4 animate-pulse ">
            <div className="text-white text-sm text-center">
                <div className="mb-5 text-lg">Loading province outline...</div>
                <div className="w-16 h-16 border-8 border-retro-yellow border-dashed rounded-full animate-spin mx-auto" />
            </div>
        </div>
    )
}

export default ProvinceSkeleton
