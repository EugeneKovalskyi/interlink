import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/List.module.css'

export default function List({ list }) {
  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.link}
        id={`list-${list.id}`}
        to={`lists/${list.id}/tasks`}
      >
        {list.title}
      </Link>
    </div>
  )
}
