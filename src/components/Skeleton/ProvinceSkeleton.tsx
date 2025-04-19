import React from 'react'

const ProvinceSkeleton: React.FC = () => {
    return (
        <div className="w-full md:w-4xl h-48 md:h-96 relative flex items-center justify-center mb-6 py-4 animate-pulse">
            <div className="text-gray-500 text-sm text-center">
                <div className="mb-2">Loading province outline...</div>
                <div className="w-16 h-16 border-8 border-retro-purple border-dashed rounded-full animate-spin mx-auto" />
            </div>
        </div>
    )
}

export default ProvinceSkeleton
