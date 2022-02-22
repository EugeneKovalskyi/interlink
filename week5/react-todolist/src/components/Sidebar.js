import React from 'react'
import styles from '../style/Sidebar.module.css'

import List from './List'

export default function Sidebar({ lists }) {
  return (
    <div className={styles.sidebar}>
      <a className={styles.link} href='/'>
        Today
      </a>
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  )
}
