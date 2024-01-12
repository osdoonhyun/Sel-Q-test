import { useEffect, useState } from 'react';

export default function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastExecTime, setLastExecTime] = useState(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastExecTime > delay) {
      setThrottledValue(value);
      setLastExecTime(now);
    }
  }, [value, delay, lastExecTime]);

  return throttledValue;
}
