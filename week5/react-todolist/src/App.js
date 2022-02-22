import React, { useState } from 'react'
import styles from './style/App.module.css'

import Sidebar from './components/Sidebar'
import TasksList from './components/TasksList'

function App() {
  const lists = [
    { id: 1, title: 'Everyday' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Homework' },
  ]

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Read book',
      done: false,
      due_date: '2022-03-03',
      list_id: 1,
      description: 'I want read Harry Potter',
    },
    {
      id: 2,
      title: 'Workout',
      done: false,
      due_date: '2022-04-04',
      list_id: 1,
      description: 'Running, horizontal bar',
    },
    {
      id: 3,
      title: 'Buy bread',
      done: true,
      due_date: '2022-02-02',
      list_id: 3,
      description: 'Need white bread',
    },
  ])

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

  return (
    <div className={styles.app}>
      <Sidebar lists={lists} />
      <TasksList tasks={tasks} setTask={toggleTask} deleteTask={deleteTask} />
    </div>
  )
}

export default App
