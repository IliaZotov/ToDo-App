import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ toDo, onFilter, onFilterChange, clearCompletedTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${toDo} items left`}</span>
      <TasksFilter onFilter={onFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  onFilter: () => {},
  onFilterChange: () => {},
  clearCompletedTasks: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  onFilter: PropTypes.func,
  onFilterChange: PropTypes.func,
  clearCompletedTasks: PropTypes.func,
};

export default Footer;
