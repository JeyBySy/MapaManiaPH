import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const FullScreenLayout: React.FC = () => {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);

    let title = "";

    if (segments[0] === 'exploremap') {
        title = segments[1] ? decodeURIComponent(segments[1].replace(/_/g, ' ')) : "Explore Map";
    } else if (segments[0] === 'challenge') {
        title = "Challenge";
    } else {
        title = segments[1] ? decodeURIComponent(segments[1].replace(/_/g, ' ')) : "";
    }

    return (
        <div className="flex flex-col w-full">
            <HomeButton titlePage={title} />
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
