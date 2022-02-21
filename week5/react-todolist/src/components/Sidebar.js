import React from 'react'
import styles from '../style/Sidebar.module.css'

import List from './List'

export default function Sidebar({ lists, selectList, selectedListId }) {
  return (
    <div className={styles.sidebar}>
      <form>
        {lists.map((list) => (
          <List
            key={`list-${list.id}`}
            list={list}
            selectList={selectList}
            selectedListId={selectedListId}
          />
        ))}
      </form>
    </div>
  )
}
