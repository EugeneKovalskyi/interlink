import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/Task.module.css'

export default function Task({ task, setTask, deleteTask }) {
  const titleClasses = []
  const dateClasses = [styles.date]
  const descriptionClasses = [styles.description]
  const due_date = new Date(task.due_date).toLocaleDateString('uk-UA')

  function isOverdue() {
    const dueDate = new Date(task.due_date)

    let currentDate = new Date()
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )

    return currentDate > dueDate ? true : false
  }

  if (task.done) {
    titleClasses.push(styles.done)
    dateClasses.push(styles.done)
    descriptionClasses.push(styles.done)
  }

  if (isOverdue()) {
    dateClasses.push(styles.overdue)
  }

  return (
    <div className={styles.task}>
      <button className={styles.delete} onClick={() => deleteTask(task.id)}>
        &times;
      </button>
      <label>
        <input
          className={styles.checkbox}
          id={`task-${task.id}`}
          type='checkbox'
          checked={task.done}
          onChange={() => setTask(task.id, task.done)}
        />
        <span className={titleClasses.join(' ')}>
          {task.title || task.task_title}
        </span>
      </label>
      {task.due_date && (
        <span className={dateClasses.join(' ')}>Due date: {due_date}</span>
      )}
      {task.description && (
        <p className={descriptionClasses.join(' ')}>
          Description: {task.description}
        </p>
      )}
      {task.list_title && (
        <p className={styles.description}>
          List:{' '}
          <Link className={styles.link} to={`../lists/${task.list_id}`}>
            {task.list_title}
          </Link>
        </p>
      )}
    </div>
  )
}
