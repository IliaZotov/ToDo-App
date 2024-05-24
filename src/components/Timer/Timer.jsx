import React, { useEffect, useRef } from 'react';

const Timer = ({
  secondsTime,
  id,
  timerId,
  done,
  startTimer,
  stopTimer,
  timerIsActive,
  updateTimer,
}) => {
  const intervalId = useRef(null);

  useEffect(() => {
    if (secondsTime <= 0) {
      clearInterval(intervalId.current);
    }
  }, [secondsTime]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const onStopTimer = (idx) => {
    clearInterval(intervalId.current);
    stopTimer(idx);
  };

  const tick = () => {
    if (secondsTime <= 0) {
      onStopTimer(id);
    } else {
      updateTimer(id);
    }
  };

  const onStartTimer = (idx) => {
    if (!timerIsActive) {
      intervalId.current = setInterval(tick, 1000);
      startTimer(idx, intervalId.current);
    }
  };

  const minutes = Math.floor(secondsTime / 60);
  const seconds = secondsTime - minutes * 60;
  const time = `${minutes} : ${seconds}`;

  return (
    <>
      <button
        className='icon icon-play'
        type='button'
        onClick={() => onStartTimer(id)}
        disabled={done}
      ></button>
      <button
        className='icon icon-pause'
        type='button'
        onClick={() => onStopTimer(id)}
        disabled={done}
      ></button>
      <span>{minutes > 0 || seconds > 0 ? time : 'time is over'}</span>
    </>
  );
};

export default Timer;
