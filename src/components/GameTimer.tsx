import React from 'react';
import useTimer from '../hooks/useTimer';
import formatTime from '../util/formatTime'

const Timer: React.FC = () => {
    const { time } = useTimer();

    return (
        <div className="text-xl font-mono">
            {formatTime(time)}
        </div>
    );
};

export default Timer;
