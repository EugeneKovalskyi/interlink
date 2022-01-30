const List = require('../models/List')

class ListController {
  find() {
    return List
  }
  findListById(listId) {
    return List[listId - 1]
  }

  findTaskById(listId, taskId) {
    return List[listId - 1][taskId - 1]
  }

  createList(task) {
    const id = 1
    const title = task.title
    const done = false

    List.push([{ id, title, done }])

    return List
  }

  createTask(listId, task) {
    const id = List[listId - 1].length + 1
    const title = task.title
    const done = false
    List[listId - 1].push({ id, title, done })
  }

  updateById(listId, taskId, task) {
    const taskToUpdate = List[listId - 1][taskId - 1]
    const title = task.title
    const done = task.done

    if (title !== undefined) {
      taskToUpdate.title = title
    }

    if (done !== undefined) {
      taskToUpdate.done = done
    }

    return taskToUpdate
  }

  removeListById(listId) {
    List.splice(listId - 1, 1)
    return List
  }

  removeTaskById(listId, taskId) {
    List[listId - 1].splice(taskId - 1, 1)
    List[listId - 1].forEach((list, index) => (list.id = index + 1))
  }
}

module.exports = new ListController()
