const List = require('../models/List')

class ListController {
  find() {
    return List
  }
  findListById(listId) {
    return List[listId - 1]
  }

  findTaskById(listId, id) {
    const task = List[listId - 1].tasks[id - 1]

    return task
  }

  createList(task) {
    const listId = List.length + 1
    const listTitle = `List name ${listId}`
    const id = 1
    const title = task.title
    const done = false

    List.push({
      listId,
      listTitle,
      tasks: [{ id, title, done }],
    })

    return List[listId - 1].tasks[id - 1]
  }

  createTask(listId, task) {
    const id = List[listId - 1].tasks.length + 1
    const title = task.title
    const done = false

    List[listId - 1].tasks.push({ id, title, done })

    return List[listId - 1].tasks[id - 1]
  }

  updateById(listId, id, task) {
    const taskToUpdate = List[listId - 1].tasks[id - 1]
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

  replaceById(listId, id, task) {
    const title = task.title
    const done = task.done
    const replacedTask = List[listId - 1].tasks[id - 1]

    replacedTask.title = title
    replacedTask.done = done
    replacedTask.id = id

    return replacedTask
  }

  removeListById(listId) {
    const removedList = List.splice(listId - 1, 1)

    List.forEach((list, index) => (list.listId = index + 1))

    return removedList
  }

  removeTaskById(listId, id) {
    const removedTask = List[listId - 1].tasks[id - 1].splice(id - 1, 1)

    List[listId - 1].tasks.forEach((task, index) => (task.id = index + 1))

    return removedTask
  }
}

module.exports = new ListController()
