import React from 'react'
import styles from '../style/sidebar.module.css'

import List from './List'

const lists = [
  { id: 1, title: 'Everyday' },
  { id: 2, title: 'Cars' },
  { id: 3, title: 'Homework' },
]

export default function TodoListSidebar(props) {
  return (
    <div className={styles.sidebar}>
      <form>
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </form>
    </div>
  )
}
