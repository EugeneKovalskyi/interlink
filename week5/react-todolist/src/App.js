import React from 'react'
import styles from './style/App.module.css'

import TodoListSidebar from './components/Sidebar'

const lists = [
  { id: 1, title: 'Everyday' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Homework' },
]

function App() {
  return (
    <div className={styles.app}>
      <TodoListSidebar lists={lists} />
    </div>
  )
}

export default App
