import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ onFilter }) => {
  const [buttons, setButtons] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const switchFilter = (key) => {
    onFilter(key);
    setButtons({
      all: key === 'All',
      active: key === 'Active',
      completed: key === 'Completed',
    });
  };

  return (
    <ul className='filters'>
      <li>
        <button
          type='button'
          className={buttons.all ? 'selected' : ''}
          onClick={() => {
            switchFilter('All');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type='button'
          className={buttons.active ? 'selected' : ''}
          onClick={() => {
            switchFilter('Active');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type='button'
          className={buttons.completed ? 'selected' : ''}
          onClick={() => {
            switchFilter('Completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = { onFilter: () => {} };

TasksFilter.propTypes = { onFilter: PropTypes.func };

export default TasksFilter;
