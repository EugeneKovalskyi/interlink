import React from 'react'

import Task from './Task'

export default function TasksList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}
