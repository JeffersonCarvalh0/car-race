import { useState, useEffect } from 'react';

interface Timer {
  time: number;
  pause: Function;
  resume: Function;
  reset: Function;
}

const useTimer = (): Timer => {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setTime(prev => prev + 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [time, paused]);

  return {
    time: time,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
    reset: () => setTime(0),
  };
};

export default useTimer;
