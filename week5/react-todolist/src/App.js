import React, { useState } from 'react'
import styles from './style/App.module.css'

import TodoListSidebar from './components/Sidebar'

function App() {
  const lists = [
    { id: 1, title: 'Everyday' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Homework' },
  ]

  const [selectedListId, setListId] = useState(1)

  function selectList(listId) {
    setListId(listId)
  }

  return (
    <div className={styles.app}>
      <TodoListSidebar
        lists={lists}
        selectList={selectList}
        selectedListId={selectedListId}
      />
    </div>
  )
}

export default App
