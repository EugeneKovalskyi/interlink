import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/Sidebar.module.css'

import List from './List'

export default function Sidebar({ lists }) {
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
