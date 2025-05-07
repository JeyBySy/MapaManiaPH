import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeButtonProps {
    titlePage?: string;
    toHome: boolean;
    backPath?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ titlePage, toHome, backPath }) => {
    const navigate = useNavigate();


    return (
        <div className="w-full h-fit flex items-center gap-3 lg:px-4 justify-start  transition-all duration-200">
            <button
                onClick={() => {
                    if (toHome) {
                        navigate('/');
                    } else if (backPath) {
                        navigate(backPath);
                    } else {
                        navigate(-1);
                    }
                }}
                className="w-fit items-center rounded p-4 gap-1 text-white/80 hover:text-white dark:text-gray-300/80 dark:hover:text-gray-300 cursor-pointer focus:outline focus:outline-gray-400 dark:focus:outline-gray-600 transition-all duration-200"
            >
                <ArrowLeft width={25} height={25} />
            </button>
            <p className="text-xs md:text-2xl">{titlePage}</p>
        </div>

    );
};

export default HomeButton;
