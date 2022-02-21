import React from 'react'

export default function Task({ task, setTaskDone }) {
  return (
    <div>
      <button>x</button>
      <label>
        <input
          id={`task-${task.id}`}
          type='checkbox'
          checked={task.done}
          onChange={() => setTaskDone(task.id)}
        />
        {task.title}
      </label>
      <span>{task.due_date}</span>
      <p>{task.description}</p>
    </div>
  )
}
