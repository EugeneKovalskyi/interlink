import React from 'react'
import styles from '../style/List.module.css'

export default function List({ list }) {
  return (
    <div className={styles.wrapper}>
      <a className={styles.link} id={`list-${list.id}`} href='/'>
        {list.title}
      </a>
    </div>
  )
}
