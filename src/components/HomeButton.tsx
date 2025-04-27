import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeButtonProps {
    titlePage?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ titlePage }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full lg:absolute h-fit flex items-center gap-3 lg:px-4">
            <button
                onClick={() => navigate(-1)}
                className="w-fit items-center border p-4 gap-1 text-white/80 hover:text-white dark:text-gray-300/80 dark:hover:text-gray-300 cursor-pointer"
            >
                <ArrowLeft width={25} height={25} />
            </button>
            <p className="text-xl sm:text-4xl md:text-2xl py-4">{titlePage}</p>
        </div>
    );
};

export default HomeButton;
