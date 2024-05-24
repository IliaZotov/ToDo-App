import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';

const Task = ({
  id,
  description,
  date,
  done,
  onDeleted,
  onToggleDone,
  onEdit,
  secondsTime,
  timerId,
  startTimer,
  stopTimer,
  updateTimer,
  timerIsActive,
}) => {
  const [editedDescription, setEditedDescription] = useState('');
  const [editing, setEditing] = useState(false);

  const onClickEdit = (prevDescription) => {
    setEditedDescription(prevDescription);
    setEditing(true);
  };

  const onChangeTask = (event) => {
    setEditedDescription(event.target.value);
  };

  const onChangeTaskBlur = () => {
    setEditing(false);
  };

  const onSubmitUpdatedTask = (event) => {
    event.preventDefault();
    if (editedDescription.trim()) {
      onEdit(id, editedDescription);
      setEditedDescription('');
      setEditing(false);
    }
  };

  const dateTask = date
    ? formatDistanceToNow(new Date(date), {
        includeSeconds: true,
        addSuffix: true,
      })
    : '';

  return (
    <li className={done ? 'completed' : editing ? 'editing' : null}>
      {editing ? (
        <form onSubmit={onSubmitUpdatedTask}>
          <input
            type='text'
            className='edit'
            value={editedDescription}
            onChange={onChangeTask}
            onBlur={onChangeTaskBlur}
            autoFocus
          />
        </form>
      ) : (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={done}
            onChange={onToggleDone}
            id={id}
          />
          <label htmlFor={id}>
            <span className='title'>{description}</span>
            <Timer
              secondsTime={secondsTime}
              startTimer={startTimer}
              stopTimer={stopTimer}
              updateTimer={updateTimer}
              timerId={timerId}
              id={id}
              timerIsActive={timerIsActive}
              done={done}
            />
            <span className='description'>created {dateTask} ago</span>
          </label>
          {!done && (
            <button
              className='icon icon-edit'
              onClick={() => onClickEdit(description)}
            />
          )}
          <button className='icon icon-destroy' onClick={onDeleted} />
        </div>
      )}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  done: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  secondsTime: PropTypes.number.isRequired,
  timerId: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  updateTimer: PropTypes.func,
  timerIsActive: PropTypes.bool,
};

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
};

export default Task;
