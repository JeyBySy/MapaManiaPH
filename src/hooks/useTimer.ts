import { useState, useEffect, useRef } from 'react';
import {MAX_CHALLENGE_TIME_LIMIT} from '../util/constants'

const useTimer = (initialTime: number = MAX_CHALLENGE_TIME_LIMIT,onTimeEnd?: () => void) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true); // Control when to run
  const intervalRef = useRef<NodeJS.Timeout | null>(null);  

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

   useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (onTimeEnd) onTimeEnd();
    }
  }, [time, onTimeEnd]);

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const timeUsed = initialTime - time;

  return { time, pause, resume,timeUsed, isRunning };
};

export default useTimer;
