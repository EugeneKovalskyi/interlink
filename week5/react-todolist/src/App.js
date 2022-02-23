import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import TodayTasks from './components/TodayTasks'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/today' element={<TodayTasks />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
