import React, { useState } from 'react'
import styles from '../style/Form.module.css'

export default function Form({ tasks, addTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDueDate] = useState('')

  function submitHandler(event) {
    event.preventDefault()

    if (title.trim()) {
      addTask({
        id: tasks.length + 1,
        title,
        done: false,
        due_date: due_date ? due_date : undefined,
        list_id: 1,
        description: description ? description : undefined,
      })

      setTitle('')
      setDescription('')
      setDueDate('')
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.label}>
        Title
        <input
          className={styles.input}
          type='text'
          name='title'
          placeholder='Title'
          autoComplete='off'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        Description
        <input
          className={styles.input}
          type='text'
          name='description'
          placeholder='Description'
          autoComplete='off'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        Due date
        <input
          className={styles.input}
          type='date'
          name='due_date'
          autoComplete='off'
          value={due_date}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>
      <button className={styles.button} type='submit'>
        Create new task
      </button>
    </form>
  )
}
