import React from 'react';

export default class Timer extends React.Component {
  tick = () => {
    const { id, updateTimer, secondsTime } = this.props;
    if (secondsTime <= 0) {
      this.onStopTimer(id);
    } else updateTimer(id);
  };

  onStartTimer = (id) => {
    const { startTimer, timerIsActive } = this.props;
    if (!timerIsActive) {
      this.timerId = setInterval(() => this.tick(), 1000);
      startTimer(id, this.timerId);
    }
  };

  onStopTimer = (id) => {
    const { stopTimer } = this.props;
    clearInterval(this.timerId);
    stopTimer(id);
  };

  render() {
    const { secondsTime, id, done } = this.props;
    const minutes = Math.floor(secondsTime / 60);
    const seconds = secondsTime - minutes * 60;
    const time = `${minutes} : ${seconds}`;
    return (
      <>
        <button
          className='icon icon-play'
          type='button'
          onClick={() => this.onStartTimer(id)}
          disabled={done}
        ></button>
        <button
          className='icon icon-pause'
          type='button'
          onClick={() => this.onStopTimer(id)}
          disabled={done}
        ></button>
        <span>{minutes > 0 || seconds > 0 ? time : 'time is over'}</span>
      </>
    );
  }
}
