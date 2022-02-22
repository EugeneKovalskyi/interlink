import React from 'react'

import Task from './Task'

export default function TasksList({ tasks, setTask, deleteTask }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          setTask={setTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
}
