import React from 'react'
import styles from '../style/Task.module.css'

export default function Task({ task, setTaskDone }) {
  return (
    <div className={styles.task}>
      <button className={styles.delete}>X</button>
      <label>
        <input
          className={styles.checkbox}
          id={`task-${task.id}`}
          type='checkbox'
          checked={task.done}
          onChange={() => setTaskDone(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <span className={styles.date}>Due date: {task.due_date}</span>
      <p className={styles.description}>Description: {task.description}</p>
    </div>
  )
}
