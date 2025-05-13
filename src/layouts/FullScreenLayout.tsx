import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { ignoreCharProvinceName } from '../util/formatProvinceName'

const FullScreenLayout: React.FC = () => {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);
    const location = useLocation();
    const from = location.state?.from;

    let title = "";

    if (segments[0] === 'exploremap') {
        title = segments[1] ? decodeURIComponent(ignoreCharProvinceName(segments[1])) : "Explore Map";
    } else if (segments[0] === 'challenge') {
        title = "Challenge";
    } else {
        title = segments[1] ? decodeURIComponent(ignoreCharProvinceName(segments[1])) : "";
    }
    const isQuickstart = segments[0] === 'quickstart';
    const isChallenge = segments[0] === 'challenge' && segments.length === 1;
    const isExploreMapRoot = segments[0] === 'exploremap' && segments.length === 1;

    const toHome = isQuickstart || isChallenge || isExploreMapRoot;

    return (
        <div className="flex flex-col w-full">
            <HomeButton titlePage={title} toHome={toHome} backPath={from} />
            <Outlet />
        </div>
    );
};

export default FullScreenLayout;
