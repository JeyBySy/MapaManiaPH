import { House } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'



const HomeButton: React.FC = () => {
    return (
        <Link to={'/'}>
            <button className='hidden lg:block absolute top-2 right-2 p-3 cursor-pointer hover:bg-gray-200 bg-gray-200/50 rounded hover:text-gray-500 shadow-2xl '><House /></button>
        </Link>
    )
}

export default HomeButton