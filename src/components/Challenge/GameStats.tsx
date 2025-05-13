import React from 'react'

type GameStatsProps = {
    title: string;
    value: string | number;
    totalValue?: number;
};


const GameStats: React.FC<GameStatsProps> = ({ title, value, totalValue }) => {
    return (
        <div className="inline-flex flex-col gap-4 items-center py-5 text-center w-[160px] shrink-0">
            <span className="text-xl lg:text-2xl font-[900]">
                {value}{totalValue && '/' + totalValue}
            </span>
            <p className="text-[55%] lg:text-[10px] lowercase text-wrap w-full px-2">{title}</p>
        </div>
    );
};


export default GameStats