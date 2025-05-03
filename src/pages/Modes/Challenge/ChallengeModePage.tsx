import React from 'react'
import { useNavigate } from "react-router-dom";



export const ChallengeModePage: React.FC = () => {
    const navigate = useNavigate()

    const handlePlayButton = () => {
        navigate(`play`)
    }
    return (
        <div className="flex w-full items-center justify-center min-h-[92dvh] container mx-auto relative">
            <main className='container mx-auto px-2'>
                <div className='grid grid-row-2 gap-10'>
                    <div className='grid lg:grid-cols-[1fr_1fr_1fr] gap-1 h-[300px]'>
                        <div className='border text-center overflow-y-auto flex items-center justify-center rounded cursor-pointer'>
                            <div>
                                PROVINCE 1 IMAGE
                                <p>name</p>
                            </div>

                        </div>
                        <div className='border text-center overflow-y-auto flex items-center justify-center rounded cursor-pointer'>
                            <div>
                                PROVINCE 2 IMAGE
                                <p>name</p>
                            </div>
                        </div>
                        <div className='border text-center overflow-y-auto flex items-center justify-center rounded cursor-pointer'>
                            <div>
                                PROVINCE 3 IMAGE
                                <p>name</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full items-center justify-center flex  gap-1'>
                        <button className='cursor-pointer w-fit border p-5 rounded '>Re-roll</button>
                        <button className='cursor-pointer w-fit border p-5 rounded' onClick={() => { handlePlayButton() }}>Play</button>
                    </div>
                </div>
            </main>
        </div>
    )
}
