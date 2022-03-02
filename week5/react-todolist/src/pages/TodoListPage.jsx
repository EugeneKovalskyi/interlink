import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Task from '../components/Task'
import Form from '../components/Form'

export default function TodoListPage() {
  const [tasks, setTasks] = useState([])
  const { list_id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lists/${list_id}/tasks?all=true`)
      .then((res) => setTasks(res.data))
      .catch((error) => console.log(error))
  }, [list_id])

  function toggleTask(id, done) {
    axios
      .patch(`http://localhost:5000/api/lists/${list_id}/tasks/${id}`, {
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

  function addTask(task) {
    axios
      .post(`http://localhost:5000/api/lists/${list_id}/tasks`, task)
      .then((res) => {
        setTasks(tasks.concat([res.data]))
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
      <Form tasks={tasks} addTask={addTask} />
    </div>
  )
}
