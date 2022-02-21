import React from 'react'
import styles from '../style/sidebar.module.css'

export default function List(props) {
  const list = props.list

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input className={styles.input} id={`list-${list.id}`} type='radio' />
        {list.title}
      </label>
    </div>
  )
}
