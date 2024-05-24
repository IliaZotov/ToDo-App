import React, { useState, useRef } from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

const App = () => {
  const maxId = useRef(100);
  const [todoData, setToDoData] = useState([]);
  const [filter, setFilter] = useState('All');
  console.log('todoData:', todoData);

  const createTask = (description, secondsTime) => {
    return {
      description,
      done: false,
      date: new Date(),
      id: maxId.current++,
      secondsTime: secondsTime,
      timerIsActive: false,
    };
  };

  const addTask = (text, secondsTime) => {
    const newTask = createTask(text, secondsTime);

    setToDoData((prevToDoData) => {
      const newArr = [...prevToDoData, newTask];
      console.log(newArr);
      return newArr;
    });
  };

  const deleteTask = (id) => {
    setToDoData((prevToDoData) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = prevToDoData.slice(0, idx);
      const after = prevToDoData.slice(idx + 1);

      clearInterval(prevToDoData[idx].timerId);
      return [...before, ...after];
    });
  };

  const editTask = (id, newDescription) => {
    setToDoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id);
      const oldItem = prevData[idx];
      const newItem = { ...oldItem, description: newDescription };

      const before = prevData.slice(0, idx);
      const after = prevData.slice(idx + 1);

      return [...before, newItem, ...after];
    });
  };

  const onToggleDone = (id) => {
    setToDoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id);
      const oldItem = prevData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const before = prevData.slice(0, idx);
      const after = prevData.slice(idx + 1);

      clearInterval(oldItem.timerId);
      return [...before, newItem, ...after];
    });
  };

  const onFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredTasks = () => {
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

  const clearCompletedTasks = () => {
    setToDoData((prevData) => prevData.filter((el) => !el.done));
  };

  const startTimer = (id, timerId) => {
    setToDoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id);
      const oldItem = prevData[idx];
      const newItem = { ...oldItem, timerIsActive: true, timerId };

      const before = prevData.slice(0, idx);
      const after = prevData.slice(idx + 1);

      return [...before, newItem, ...after];
    });
  };

  const stopTimer = (id) => {
    setToDoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id);
      const oldItem = prevData[idx];
      const newItem = { ...oldItem, timerIsActive: false, timerId: null };

      const before = prevData.slice(0, idx);
      const after = prevData.slice(idx + 1);

      return [...before, newItem, ...after];
    });
  };

  const updateTimer = (id) => {
    setToDoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id);
      const oldItem = prevData[idx];
      const newItem = { ...oldItem, secondsTime: oldItem.secondsTime - 1 };

      const before = prevData.slice(0, idx);
      const after = prevData.slice(idx + 1);

      return [...before, newItem, ...after];
    });
  };
  const filteredTasks = getFilteredTasks();
  const doneCount = todoData.filter((el) => el.done).length;
  const toDoCount = todoData.length - doneCount;
  console.log('filteredTasks:', filteredTasks);

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>To Do </h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className='main'>
        <TaskList
          todos={filteredTasks}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onEditDescription={editTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
          updateTimer={updateTimer}
        />
        <Footer
          toDo={toDoCount}
          filter={filter}
          onFilter={onFilter}
          clearCompletedTasks={clearCompletedTasks}
        />
      </section>
    </section>
  );
};

export default App;
