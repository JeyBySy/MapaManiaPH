import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const FullScreenLayout: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex flex-col w-full">
            <HomeButton />
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
