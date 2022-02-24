import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import styles from '../style/Sidebar.module.css'

import List from './List'

export default function Sidebar() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard').then((res) => {
      setLists(res.data.dashboard)
    })
  }, [])

  return (
    <div className={styles.sidebar}>
      <NavLink className={styles.link} to='/today'>
        Today
      </NavLink>
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  )
}
