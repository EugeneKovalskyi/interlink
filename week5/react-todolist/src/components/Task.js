import React from 'react'
import styles from '../style/Task.module.css'

export default function Task({ task, setTask, deleteTask }) {
  const titleClasses = []
  const dateClasses = [styles.date]
  const descriptionClasses = [styles.description]

  function isOverdue() {
    const currentTime = new Date().getTime()
    const dueTime = new Date(task.due_date).getTime()

    return currentTime > dueTime ? true : false
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
        X
      </button>
      <label>
        <input
          className={styles.checkbox}
          id={`task-${task.id}`}
          type='checkbox'
          checked={task.done}
          onChange={() => setTask(task.id)}
        />
        <span className={titleClasses.join(' ')}>{task.title}</span>
      </label>
      {task.due_date ? (
        <span className={dateClasses.join(' ')}>Due date: {task.due_date}</span>
      ) : (
        ''
      )}
      {task.description ? (
        <p className={descriptionClasses.join(' ')}>
          Description: {task.description}
        </p>
      ) : (
        ''
      )}
    </div>
  )
}
