import { House } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'



const HomeButton: React.FC = () => {
    const navigate = useNavigate()
    const handleBackButton = () => {
        navigate(`/`)
    }
    return (
        <button onClick={() => { handleBackButton() }} className='hidden lg:block absolute top-2 right-2 p-3 cursor-pointer hover:bg-gray-200 bg-gray-200/50 rounded hover:text-gray-500 shadow-2xl '><House /></button>
    )
}

export default HomeButton