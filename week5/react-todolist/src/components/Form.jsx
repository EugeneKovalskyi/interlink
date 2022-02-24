import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../style/Form.module.css'

export default function Form({ addTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDueDate] = useState('')

  const { list_id } = useParams()

  function submitHandler(event) {
    event.preventDefault()

    if (title.trim()) {
      addTask({
        title,
        due_date,
        list_id,
        description,
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
