import React from 'react';
import { Outlet } from 'react-router-dom';

const FullScreenLayout: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex flex-col w-full">
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
