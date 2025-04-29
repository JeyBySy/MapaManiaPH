import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeButtonProps {
    titlePage?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ titlePage }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full lg:absolute h-fit flex items-center gap-3 lg:px-4 justify-start hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200">
            <button
                onClick={() => navigate(-1)}
                className="w-fit items-center rounded p-4 gap-1 text-white/80 hover:text-white dark:text-gray-300/80 dark:hover:text-gray-300 cursor-pointer focus:outline focus:outline-gray-400 dark:focus:outline-gray-600 transition-all duration-200"
            >
                <ArrowLeft width={25} height={25} />
            </button>
            <p className="text-xs md:text-2xl">{titlePage}</p>
        </div>

    );
};

export default HomeButton;
