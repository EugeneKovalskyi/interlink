const express = require('express') // return function
const app = express() // return object
const port = 3000
const tasks = [
  { id: 1, title: 'Wake up', done: false },
  { id: 2, title: 'Read book', done: true },
]

app.use(express.json())
app.use(logRequest)

app.get('/api/todoitem', (req, res) => res.json(tasks))

app.post('/api/todoitem', (req, res) => {
  const task = createTask(req.body)
  tasks.push(task)
  res.json(task)
})

app.patch('/api/todoitem/:id', (req, res) => {
  const id = parseInt(req.params.id) - 1
  if (tasks[id]) {
    updateTask(req.body, id)
    res.json(tasks[id])
  } else {
    res.status(404).json({ error: 'Task not found!!!' })
  }
})

app.listen(port, () => console.log('Server started ... '))

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`)
  next()
}

function createTask(data) {
  const id = tasks.length + 1
  let title = data.title
  let done = false

  return { id, title, done }
}

function updateTask(data, id) {
  const title = data.title
  const done = data.done

  if (title !== undefined) {
    tasks[id].title = title
  }

  if (done !== undefined) {
    tasks[id].done = done
  }
}
