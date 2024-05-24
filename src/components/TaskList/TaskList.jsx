import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({
  todos,
  onDeleted,
  onToggleDone,
  onEditDescription,
  startTimer,
  stopTimer,
  updateTimer,
  timerId,
}) => {
  const elements = todos.map((item) => {
    return (
      <Task
        {...item}
        secondsTime={item.secondsTime}
        key={item.id}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        onEdit={onEditDescription}
        startTimer={startTimer}
        stopTimer={stopTimer}
        updateTimer={updateTimer}
        timerId={timerId}
      />
    );
  });

  return <ul className='todo-list'>{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      secondsTime: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditDescription: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  updateTimer: PropTypes.func,
  timerId: PropTypes.number,
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditDescription: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  updateTimer: () => {},
  timerId: null,
};

export default TaskList;
