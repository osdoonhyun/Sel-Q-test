import { useEffect, useState } from 'react';
import { RedDiv } from '../styles/Styles';
import {
  INITIAL_TIME_LEFT,
  timeToMinutes,
  timeToSeconds,
} from '../utils/timer';
import { MESSAGE } from '../constant/message';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);
  const [expired, setExpired] = useState(false);

  const minutes = timeToMinutes(timeLeft);
  const seconds = timeToSeconds(timeLeft);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setExpired(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <RedDiv>
      {expired ? MESSAGE.TIMER.EXPIRED_CODE : `${minutes}:${seconds}`}
    </RedDiv>
  );
}
