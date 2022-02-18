import React from 'react'
import './App.css'

import Header from './components/Header'
import Message from './components/Message'

function App() {
  const user = { name: 'Yevhen', message: 'Hello!', time: '18:00' }

  return (
    <div className='App'>
      <Header />
      <Message user={user} />
    </div>
  )
}

export default App
