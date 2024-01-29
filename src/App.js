import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter from './components/TaskFilter';
import Tasklist from './components/Tasklist';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  

  useEffect(() => {
    if (tasks.length > 0) { localStorage.setItem('tasks', JSON.stringify(tasks)) }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };




  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Task Tracker</h1>
        <AddTaskForm onAddTask={addTask} />
        <TaskFilter currentFilter={filter} onFilterChange={handleFilterChange} />
        <Tasklist tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTaskStatus={toggleTaskStatus} setTasks={setTasks}/>
      </div>
    </DndProvider>

  );
}

export default App;
