import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const FullScreenLayout: React.FC = () => {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);

    const pageTitles: Record<string, string> = {
        "/exploremap": "Explore Map",
    };

    const title = pageTitles[pathname] ||
        (segments[1] ? decodeURIComponent(segments[1].replace(/_/g, ' ')) : "");


    return (
        <div className="flex flex-col w-full">
            <HomeButton titlePage={title} />
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
