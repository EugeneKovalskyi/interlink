import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Task from '../components/Task'

export default function TodayTasksPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/collection/today')
      .then((res) => setTasks(res.data))
      .catch((error) => console.log(error))
  }, [])

  function toggleTask(id, done) {
    axios
      .patch(`http://localhost:5000/api/lists/*/tasks/${id}`, {
        done: !done,
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === id) {
              task.done = !task.done
            }
            return task
          })
        )
      })
      .catch((error) => console.log(error))
  }

  function deleteTask(id) {
    axios
      .delete(`http://localhost:5000/api/lists/*/tasks/${id}`)
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id))
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      {tasks.length
        ? tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              setTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))
        : 'No tasks yet...'}
    </div>
  )
}
