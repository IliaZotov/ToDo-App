import React from 'react';

export default class NewTaskForm extends React.Component {
  state = { description: '', minutesTime: '', secondsTime: '' };

  onSubmit = (event) => {
    const { description, minutesTime, secondsTime } = this.state;
    const totalSeconds = Number(minutesTime) * 60 + Number(secondsTime);
    event.preventDefault();
    this.props.onTaskAdded(description, totalSeconds);
    this.setState({
      description: '',
      minutesTime: '',
      secondsTime: '',
    });
  };

  onTextChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onMinTimerChange = (event) => {
    this.setState({ minutesTime: event.target.value });
  };

  onSecTimerChange = (event) => {
    this.setState({ secondsTime: event.target.value });
  };

  render() {
    const { description, secondsTime, minutesTime } = this.state;
    return (
      <form className='new-todo-form' onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          onChange={this.onTextChange}
          value={description}
        />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          onChange={this.onMinTimerChange}
          value={minutesTime}
          type='number'
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          onChange={this.onSecTimerChange}
          value={secondsTime}
          type='number'
        />
        <button type='submit' style={{ display: 'none' }} aria-hidden />
      </form>
    );
  }
}

NewTaskForm.defaultProps = { onTaskAdded: () => {} };
