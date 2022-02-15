const isAllCheckboxElement = document.querySelector('.todo__is-all__checkbox')
const todoListElement = document.querySelector('.todo-list')
const createTaskFormElement = document.forms.createTask
// const allTasks = document.querySelectorAll('.todo-task')

window.addEventListener('load', () => {
  getTasks().then((tasks) => tasks.forEach(appendTaskToList))
})
todoListElement.addEventListener('change', setTaskDone)
isAllCheckboxElement.addEventListener('change', showAllTasks)
todoListElement.addEventListener('click', removeTask)
createTaskFormElement.addEventListener('submit', createTask)

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

    dueDateElement.textContent = 'Due date: ' + formatDate(task.due_date)

    if (currentTime > dueTime && !task.done)
      dueDateElement.classList.add('todo-task__due-date--overdue')
  }

  if (task.description)
    descriptionElement.textContent = 'Description: ' + task.description

  todoListElement.append(taskTemplate)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

function setTaskDone(event) {
  const target = event.target

  if (target.classList.contains('todo-task-checkbox')) {
    const taskElement = target.closest('.todo-task')
    const id = taskElement.getAttribute('id').split('-')[1]

    taskElement.classList.toggle('todo-task--done')

    updateTask(id, taskElement.classList.contains('todo-task--done'))

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
  // const id = allTasks.length + 1
  const title = target.title.value.trim()
  const done = false
  const description = target.description.value.trim() || undefined
  const due_date = target.due_date.value
    ? new Date(target.due_date.value.split('T').join(' '))
    : undefined

  if (!title) return

  const task = {
    id,
    title,
    done,
    due_date,
    description,
  }

  appendTaskToList(task)
  postTask(task)

  target.reset()
}

function removeTask(event) {
  if (event.target.classList.contains('todo-task__remove-btn')) {
    const taskElement = event.target.closest('.todo-task')
    const id = taskElement.getAttribute('id').split('-')[1]

    taskElement.remove()

    deleteTask(id)
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
