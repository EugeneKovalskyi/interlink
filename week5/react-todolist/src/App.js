import React from 'react'
import styles from './style/App.module.css'

import Sidebar from './components/Sidebar'
import TasksList from './components/TasksList'

function App() {
  const lists = [
    { id: 1, title: 'Everyday' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Homework' },
  ]

  const tasks = [
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
  ]

  return (
    <div className={styles.app}>
      <Sidebar lists={lists} />
      <TasksList tasks={tasks} />
    </div>
  )
}

export default App
