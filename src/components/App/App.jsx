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

  createTask(description, secondsTime) {
    return {
      description,
      done: false,
      date: new Date(),
      id: this.maxId++,
      secondsTime: secondsTime,
      timerIsActive: false,
    };
  }

  addTask = (text, secondsTime) => {
    const newTask = this.createTask(text, secondsTime);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];
      console.log(newArr);
      return { todoData: newArr };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      clearInterval(todoData[idx].timerId);
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

      clearInterval(oldItem.timerId);
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
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.done),
    }));
  };

  startTimer = (id, timerId) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, timerIsActive: true, timerId };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, newItem, ...after] };
    });
  };

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, timerIsActive: false, timerId: null };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, newItem, ...after] };
    });
  };

  updateTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, secondsTime: oldItem.secondsTime - 1 };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return { todoData: [...before, newItem, ...after] };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const doneCount = todoData.filter((el) => el.done).length;
    const toDoCount = todoData.length - doneCount;

    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>To Do </h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className='main'>
          <TaskList
            todos={filteredTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEditDescription={this.editTask}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            updateTimer={this.updateTimer}
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
