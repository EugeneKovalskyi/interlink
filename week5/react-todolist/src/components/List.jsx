import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../style/List.module.css'

export default function List({ list }) {
  return (
    <div className={styles.wrapper}>
      <NavLink
        className={styles.link}
        id={`list-${list.id}`}
        to={`lists/${list.id}`}
      >
        {list.title}
      </NavLink>
    </div>
  )
}
