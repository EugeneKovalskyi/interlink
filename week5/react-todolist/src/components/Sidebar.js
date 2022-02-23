import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/Sidebar.module.css'

import List from './List'

export default function Sidebar() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/lists')
      .then((res) => res.json())
      .then(setLists)
  }, [])

  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} to='/today'>
        Today
      </Link>
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  )
}
