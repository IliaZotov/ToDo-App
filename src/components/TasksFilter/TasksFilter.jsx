import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  state = {
    buttons: {
      all: true,
      active: false,
      completed: false,
    },
  };

  switchFilter = (key) => {
    const { onFilter } = this.props;
    switch (key) {
      case 'All':
        onFilter(key);
        this.setState(() => {
          return { buttons: { all: true, active: false, complited: false } };
        });
        break;
      case 'Active':
        onFilter(key);
        this.setState(() => {
          return { buttons: { all: false, active: true, complited: false } };
        });
        break;
      case 'Completed':
        onFilter(key);
        this.setState(() => {
          return { buttons: { all: false, active: false, complited: true } };
        });
        break;
      // skip default case
    }
  };

  render() {
    const { buttons } = this.state;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={buttons.all ? 'selected' : ''}
            onClick={() => {
              this.switchFilter('All');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={buttons.active ? 'selected' : ''}
            onClick={() => {
              this.switchFilter('Active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={buttons.completed ? 'selected' : ''}
            onClick={() => {
              this.switchFilter('Completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = { onFilter: () => {} };

TasksFilter.propTypes = { onFilter: PropTypes.func };
