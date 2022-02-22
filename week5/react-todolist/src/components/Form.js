import React from 'react'
import styles from '../style/Form.module.css'

export default function Form({ addTask }) {
  return (
    <form>
      <label className={styles.label}>
        Title
        <input
          className={styles.input}
          type='text'
          name='title'
          placeholder='Title'
        />
      </label>
      <label className={styles.label}>
        Description
        <input
          className={styles.input}
          type='text'
          name='description'
          placeholder='Description'
        />
      </label>
      <label className={styles.label}>
        Due date
        <input className={styles.input} type='date' name='due_date' />
      </label>
      <button className={styles.button} onSubmit={addTask}>
        Create new task
      </button>
    </form>
  )
}
