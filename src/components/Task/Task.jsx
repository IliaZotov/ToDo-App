import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer';

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    done: PropTypes.bool.isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEdit: PropTypes.func,
  };

  state = {
    editedDescription: '',
    editing: false,
  };

  onClickEdit = (prevDescription) => {
    this.setState({
      editedDescription: prevDescription,
      editing: true,
    });
  };

  onChangeTask = (event) => {
    this.setState({ editedDescription: event.target.value });
  };

  onChangeTaskBlur = (prevDescription) => {
    this.setState({
      editedDescription: prevDescription,
      editing: false,
    });
  };

  onSubmitUpdatedTask = (event) => {
    event.preventDefault();
    const { onEdit, id } = this.props;
    const { editedDescription } = this.state;
    if (editedDescription.trim()) {
      onEdit(id, editedDescription);
      this.setState({ editedDescription: '', editing: false });
    }
  };

  render() {
    const {
      description,
      date,
      id,
      done,
      onDeleted,
      onToggleDone,
      secondsTime,
      timerId,
      startTimer,
      stopTimer,
      updateTimer,
      timerIsActive,
    } = this.props;
    const { editing } = this.state;

    const dateTask = date
      ? formatDistanceToNow(new Date(date), {
          includeSeconds: true,
          addSuffix: true,
        })
      : '';

    return (
      <li className={done ? 'completed' : editing ? 'editing' : null}>
        {editing ? (
          <form onSubmit={this.onSubmitUpdatedTask}>
            <input
              type='text'
              className='edit'
              value={this.state.editedDescription}
              onChange={this.onChangeTask}
              onBlur={() => this.onChangeTaskBlur}
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
                onClick={() => this.onClickEdit(description)}
              />
            )}
            <button className='icon icon-destroy' onClick={onDeleted} />
          </div>
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
};
