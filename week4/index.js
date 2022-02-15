const isAllCheckboxElement = document.querySelector('.todo__is-all__checkbox')
const createTaskFormElement = document.forms.createTask

window.addEventListener('load', getTasks)

document.addEventListener('change', (event) => {
  const target = event.target

  // set task done
  if (target.classList.contains('todo-task-checkbox')) {
    setTaskDone(target)
  }

  // show and hide done tasks
  if (target === isAllCheckboxElement) {
    showAllTasks()
  }
})

document.addEventListener('click', (event) => {
  const target = event.target

  // remove task
  if (target.classList.contains('todo-task__remove-btn')) {
    removeTask(target)
  }
})

document.addEventListener('submit', (event) => {
  const target = event.target

  event.preventDefault()

  if (target === createTaskFormElement) {
    createTask(target)
  }
})

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
    const dateString = new Date(task.due_date).toISOString().split('T')[0]
    const timeString = new Date(task.due_date)
      .toISOString()
      .split('T')[1]
      .split('.')[0]

    dueDateElement.textContent = 'Due date: ' + dateString + ' ' + timeString

    if (currentTime > dueTime && !task.done)
      dueDateElement.classList.add('todo-task__due-date--overdue')
  }

  if (task.description)
    descriptionElement.textContent = 'Description: ' + task.description

  todoListElement.append(taskTemplate)
}

function setTaskDone(target) {
  const taskElement = target.closest('.todo-task')
  const id = taskElement.getAttribute('id').split('-')[1]

  taskElement.classList.toggle('todo-task--done')

  if (taskElement.classList.contains('todo-task--done')) {
    updateTask(id, true)
  } else {
    updateTask(id, false)
  }

  if (isAllCheckboxElement.checked) taskElement.style.display = 'block'
}

function showAllTasks() {
  const doneTasks = document.querySelectorAll('.todo-task--done')

  if (isAllCheckboxElement.checked) {
    doneTasks.forEach((task) => (task.style.display = 'block'))
  } else {
    doneTasks.forEach((task) => (task.style.display = 'none'))
  }
}

function createTask(target) {
  const title = target.title.value.trim()
  const done = false
  const description = target.description.value.trim() || undefined
  const due_date = target.due_date.value
    ? new Date(target.due_date.value.split('T').join(' '))
    : undefined

  if (!title) return

  const task = {
    title,
    done,
    due_date,
    description,
  }

  appendTaskToList(task)
  postTask(task)

  target.reset()
}

function removeTask(target) {
  const taskElement = target.closest('.todo-task')
  const id = taskElement.getAttribute('id').split('-')[1]

  taskElement.remove()

  deleteTask(id)
}

async function getTasks() {
  return await fetch('http://localhost:3000/api/lists/1/tasks?all=true')
    .then((response) => response.json())
    .then((tasks) => tasks.forEach((task) => appendTaskToList(task)))
    .catch((error) => {
      console.error(error)
      response.status(404).json(error)
    })
}

async function postTask(task) {
  return await fetch('http://localhost:3000/api/lists/1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
      response.status(404).json(error)
    })
}

async function updateTask(id, done) {
  return await fetch(`http://localhost:3000/api/lists/1/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done }),
  })
}

async function deleteTask(id) {
  return await fetch(`http://localhost:3000/api/lists/1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
