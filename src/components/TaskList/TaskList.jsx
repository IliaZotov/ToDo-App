import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

export default class TaskList extends Component {
  static propTypes = {
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
  };

  render() {
    const {
      todos,
      onDeleted,
      onToggleDone,
      onEditDescription,
      startTimer,
      stopTimer,
      updateTimer,
      timerId,
    } = this.props;
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
  }
}
TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditDescription: () => {},
};
