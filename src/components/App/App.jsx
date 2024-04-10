import React from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [],
    filter: 'All',
  };

  createTask(description) {
    return {
      description,
      done: false,
      date: new Date(),
      id: this.maxId++,
    };
  }

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return { todoData: newArr };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, ...after] };
    });
  };

  editTask = (id, newDescription) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, description: newDescription };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, newItem, ...after] };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, newItem, ...after] };
    });
  };

  onFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { todoData, filter } = this.state;
    switch (filter) {
      case 'All':
        return todoData;
      case 'Active':
        return todoData.filter((item) => !item.done);
      case 'Completed':
        return todoData.filter((item) => item.done);
      default:
        return todoData;
    }
  };

  clearCompletedTasks = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((el) => !el.done) }));
  };

  render() {
    const { todoData, filter } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const doneCount = todoData.filter((el) => el.done).length;
    const toDoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>To Do </h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={filteredTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEditDescription={this.editTask}
          />
          <Footer
            toDo={toDoCount}
            filter={filter}
            onFilter={this.onFilter}
            clearCompletedTasks={this.clearCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
