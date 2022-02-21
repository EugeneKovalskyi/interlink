import React from 'react'
import styles from '../style/List.module.css'

export default function List({ list }) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} id={`list-${list.id}`} type='radio' />
      {list.title}
    </div>
  )
}
