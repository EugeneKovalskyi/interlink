const isAllCheckboxElement = document.querySelector('.todo__is-all__checkbox')
const todoListElement = document.querySelector('.todo-list')
const newTaskForm = document.forms.createTask

window.addEventListener('load', () => {
  getTasks().then((tasks) => tasks.forEach(appendTaskToList))

  isAllCheckboxElement.checked = false
})
todoListElement.addEventListener('change', setTaskDone)
isAllCheckboxElement.addEventListener('change', showAllTasks)
todoListElement.addEventListener('click', removeTask)
newTaskForm.addEventListener('submit', createTask)

function appendTaskToList(task) {
  const taskTemplate = document
    .getElementById('task-template')
    .content.cloneNode(true)

  const todoListElement = document.querySelector('.todo-list')
  const taskElement = taskTemplate.querySelector('.todo-task')
  const checkboxElement = taskTemplate.querySelector('.todo-task-checkbox')
  const titleElement = taskTemplate.querySelector('.todo-task-title')
  const dueDateElement = taskTemplate.querySelector('.todo-task__due-date')
  const descriptionElement = taskTemplate.querySelector(
    '.todo-task-description'
  )

  if (task.done) {
    taskElement.classList.add('todo-task--done')
    checkboxElement.setAttribute('checked', null)
  }

  taskElement.setAttribute('id', `task-${task.id}`)
  titleElement.setAttribute('for', `task-${task.id}`)
  checkboxElement.setAttribute('id', `task-${task.id}`)
  checkboxElement.setAttribute('name', `task-${task.id}`)
  checkboxElement.setAttribute('value', `${task.done}`)

  titleElement.textContent = task.title

  if (task.due_date) {
    const currentTime = new Date().getTime()
    const dueTime = new Date(task.due_date).getTime()

    if (currentTime > dueTime && !task.done) {
      dueDateElement.classList.add('todo-task__due-date--overdue')
    }

    dueDateElement.textContent =
      'Due date: ' + new Date(task.due_date).toLocaleDateString()
  } else {
    dueDateElement.style.display = 'none'
  }

  if (task.description) {
    descriptionElement.textContent = 'Description: ' + task.description
  } else {
    descriptionElement.style.display = 'none'
  }

  todoListElement.append(taskTemplate)
}

function setTaskDone(event) {
  const target = event.target

  if (target.classList.contains('todo-task-checkbox')) {
    const taskElement = target.closest('.todo-task')
    const id = taskElement.getAttribute('id').split('-')[1]
    const done = taskElement.classList.contains('todo-task--done')

    taskElement.classList.toggle('todo-task--done')

    updateTask(id, !done).catch(errorCallback)

    if (isAllCheckboxElement.checked) taskElement.style.display = 'block'
  }
}

function showAllTasks() {
  const doneTasks = document.querySelectorAll('.todo-task--done')

  if (isAllCheckboxElement.checked) {
    doneTasks.forEach((task) => (task.style.display = 'block'))
  } else {
    doneTasks.forEach((task) => (task.style.display = 'none'))
  }
}

function createTask(event) {
  event.preventDefault()
  const target = event.target

  const title = target.title.value.trim()
  const description = target.description.value.trim()
  const due_date = new Date(target.due_date.value)

  if (!title) return

  postTask({
    title,
    due_date,
    description,
  })
    .then((response) => response.json())
    .then(appendTaskToList)
    .catch(errorCallback)

  target.reset()
}

function removeTask(event) {
  if (event.target.classList.contains('todo-task__remove-btn')) {
    const taskElement = event.target.closest('.todo-task')
    const id = taskElement.getAttribute('id').split('-')[1]

    taskElement.remove()

    deleteTask(id).catch(errorCallback)
  }
}

function getTasks() {
  return fetch('http://localhost:3000/api/lists/1/tasks?all=true').then(
    (response) => response.json()
  )
}

function postTask(task) {
  return fetch('http://localhost:3000/api/lists/1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
}

function updateTask(id, done) {
  return fetch(`http://localhost:3000/api/lists/1/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done }),
  })
}

function deleteTask(id) {
  return fetch(`http://localhost:3000/api/lists/1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

function errorCallback(error) {
  todoListElement.innerHTML = `<span class="connection-error">Connection Error!</span><br><br><span class="error-description">${error}</span>`
}
