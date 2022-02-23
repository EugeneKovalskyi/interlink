import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './style/App.module.css'

import Sidebar from './components/Sidebar'
import TasksList from './components/TasksList'
import Form from './components/Form'

function App() {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/lists')
      .then((res) => res.json())
      .then(setLists)
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/lists/1/tasks?all=true')
      .then((res) => res.json())
      .then(setTasks)
  }, [])

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done
        }
        return task
      })
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function addTask(task) {
    setTasks(tasks.concat([task]))
  }

  return (
    <div className={styles.app}>
      <Sidebar lists={lists} />
      <Routes>
        <Route
          path='/'
          element={
            <TasksList
              tasks={tasks}
              setTask={toggleTask}
              deleteTask={deleteTask}
            />
          }
        />
      </Routes>
      <Form tasks={tasks} addTask={addTask} />
    </div>
  )
}

export default App
