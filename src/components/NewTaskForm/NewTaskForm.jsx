import React from 'react';

export default class NewTaskForm extends React.Component {

  state = { description: '' };

  onTextChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onTaskAdded(this.state.description);
    this.setState(() => {
      return { description: '' };
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onTextChange}
          value={this.state.description}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = { onTaskAdded: () => {} };
