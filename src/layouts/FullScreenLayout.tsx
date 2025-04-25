import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const FullScreenLayout: React.FC = () => {
    const { pathname } = useLocation();

    const pageTitles: Record<string, string> = {
        "/exploremap": "Explore Map",
    };

    return (
        <div className="min-h-[80vh] flex flex-col w-full">
            <HomeButton
                titlePage={pageTitles[pathname]}
            />
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
