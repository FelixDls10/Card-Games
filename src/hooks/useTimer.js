import { useState, useEffect, useRef } from 'react';

export function useTimer(running) {
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef(null);
  const accRef = useRef(0);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now();
      const id = setInterval(() => {
        setSeconds(accRef.current + Math.floor((Date.now() - startRef.current) / 1000));
      }, 500);
      return () => clearInterval(id);
    } else {
      if (startRef.current !== null) {
        accRef.current += Math.floor((Date.now() - startRef.current) / 1000);
        startRef.current = null;
      }
    }
  }, [running]);

  const reset = () => {
    accRef.current = 0;
    startRef.current = running ? Date.now() : null;
    setSeconds(0);
  };

  return { seconds, reset };
}
