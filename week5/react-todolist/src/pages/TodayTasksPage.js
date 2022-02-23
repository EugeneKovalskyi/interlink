import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Task from '../components/TodayTask'
// import Form from '../components/Form'

export default function TodayTasksPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/collection/today')
      .then((res) => setTasks(res.data))
      .catch(errorHandler)
  }, [])

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done
        }
        return task
      })
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // function addTask(task) {
  //   setTasks(tasks.concat([task]))
  // }

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
      {/* <Form tasks={tasks} addTask={addTask} /> */}
    </div>
  )
}

function errorHandler(error) {
  console.log(error)
}
