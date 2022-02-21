import React from 'react'
import styles from '../style/List.module.css'

export default function List({ list, selectList, selectedListId }) {
  return (
    <div className={styles.wrapper}>
      <label>
        <input
          className={styles.input}
          id={`list-${list.id}`}
          type='radio'
          checked={list.id === selectedListId}
          onChange={() => selectList(list.id)}
        />
        {list.title}
      </label>
    </div>
  )
}
