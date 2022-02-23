import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import TodayTasksPage from './pages/TodayTasksPage'
import TodoListPage from './pages/TodoListPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/today' element={<TodayTasksPage />} />
          <Route path='/lists/8/tasks' element={<TodoListPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
