import React from 'react'
import styles from './style/todolist.module.css'

import TodoListSidebar from './components/TodoListSidebar'

function App() {
  return (
    <div className={styles.todolist}>
      <TodoListSidebar />
    </div>
  )
}

export default App
