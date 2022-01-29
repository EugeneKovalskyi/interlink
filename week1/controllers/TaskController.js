const Task = require('../models/Task')

class TaskController {
  find() {
    return Task
  }

  findById(id) {
    return Task[id - 1]
  }

  create(task) {
    const id = Task.length + 1
    let title = task.title
    let done = false

    Task[id - 1] = { id, title, done }

    return Task
  }

  updateById(id, task) {
    let title = task.title
    let done = task.done
    console.log(title)

    if (title !== undefined) {
      Task[id - 1].title = title
    }

    if (done !== undefined) {
      Task[id - 1].done = done
    }
    return Task[id - 1]
  }

  removeById(id) {
    Task.splice(id - 1, 1)
    Task.forEach((task, index) => (task.id = index + 1))
    return Task
  }
}

module.exports = new TaskController()
