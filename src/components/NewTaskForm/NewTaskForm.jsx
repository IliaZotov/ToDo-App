import React, { useState } from 'react';

const NewTaskForm = ({ onTaskAdded }) => {
  const [description, setDescription] = useState('');
  const [minutesTime, setMinutesTime] = useState('');
  const [secondsTime, setSecondsTime] = useState('');

  const onSubmit = (event) => {
    const totalSeconds = Number(minutesTime) * 60 + Number(secondsTime);
    event.preventDefault();
    onTaskAdded(description, totalSeconds);
    setDescription('');
    setMinutesTime('');
    setSecondsTime('');
  };

  const onTextChange = (event) => {
    setDescription(event.target.value);
  };

  const onMinTimerChange = (event) => {
    setMinutesTime(event.target.value);
  };

  const onSecTimerChange = (event) => {
    setSecondsTime(event.target.value);
  };

  return (
    <form className='new-todo-form' onSubmit={onSubmit}>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        onChange={onTextChange}
        value={description}
      />
      <input
        className='new-todo-form__timer'
        placeholder='Min'
        onChange={onMinTimerChange}
        value={minutesTime}
        type='number'
      />
      <input
        className='new-todo-form__timer'
        placeholder='Sec'
        onChange={onSecTimerChange}
        value={secondsTime}
        type='number'
      />
      <button type='submit' style={{ display: 'none' }} aria-hidden />
    </form>
  );
};

NewTaskForm.defaultProps = { onTaskAdded: () => {} };

export default NewTaskForm;
