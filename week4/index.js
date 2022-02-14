const tasksArray = [
  {
    id: 1,
    title: 'Cleaning room',
    done: true,
    due_date: new Date('2022-02-10T20:00:00.000Z'),
    description: 'only kitchen',
  },
  {
    id: 2,
    title: 'Cooking food',
    done: false,
    due_date: new Date('2022-02-11T20:00:00.000Z'),
  },
  {
    id: 3,
    title: 'Buy book',
    done: false,
    due_date: new Date('2022-01-12T20:00:00.000Z'),
    description: 'buy Robinzon Kruzo',
  },
  {
    id: 4,
    title: 'Read new book',
    done: false,
    due_date: new Date('2022-02-13T20:00:00.000Z'),
  },
  {
    id: 5,
    title: 'Go to the gym',
    done: false,
    due_date: new Date('2022-02-14T20:00:00.000Z'),
  },
  {
    id: 6,
    title: 'Learn JS',
    done: false,
    due_date: new Date('2022-02-15T20:00:00.000Z'),
  },
]

const todoListElement = document.querySelector('.todo-list')
const isAllCheckboxElement = document.querySelector('.todo-isall-checkbox')
const createTaskFormElement = document.forms.createTask

// todolist rendering
for (let task of tasksArray) {
  appendTaskToListElement(task)
}

// change listener
document.addEventListener('change', (event) => {
  const target = event.target

  // task-checkbox
  if (target.classList.contains('todo-task-checkbox')) {
    setTaskDone(target)
  }

  // isAll-checkbox
  if (target === isAllCheckboxElement) {
    showAllTasks()
  }
})

// click listener
document.addEventListener('click', (event) => {
  const target = event.target

  // remove task
  if (target.classList.contains('todo-task__remove-btn')) {
    target.closest('.todo-task').remove()
  }
})

document.addEventListener('submit', (event) => {
  const target = event.target

  event.preventDefault()

  if (target === createTaskFormElement) {
    createNewTask(target)
  }
})

// functions //

function appendTaskToListElement(task) {
  const currentTime = new Date().getTime()

  const taskElement = document.createElement('div')
  const titleElement = document.createElement('label')
  const checkboxElement = document.createElement('input')
  const removeButton = document.createElement('button')

  // add class
  if (task.done) taskElement.classList.add('todo-task--done')
  taskElement.classList.add('todo-task')
  checkboxElement.classList.add('todo-task-checkbox', 'form-check-input')
  titleElement.classList.add('todo-task-label', 'form-check-label')
  removeButton.classList.add('todo-task__remove-btn', 'btn', 'btn-light')

  // set attribute
  if (task.done) checkboxElement.setAttribute('checked', null)
  checkboxElement.setAttribute('type', 'checkbox')
  checkboxElement.setAttribute('id', `task${task.id}`)
  checkboxElement.setAttribute('name', `task${task.id}`)
  checkboxElement.setAttribute('value', `${task.done}`)
  titleElement.setAttribute('for', `task${task.id}`)
  removeButton.setAttribute('type', 'button')

  // set content
  titleElement.textContent = task.title
  removeButton.innerHTML = '&#x1f5d1;'

  taskElement.append(removeButton, checkboxElement, titleElement)

  // if due_date exist
  if (task.due_date) {
    const dueTime = task.due_date.getTime()
    const dueDateElement = document.createElement('span')
    const date = task.due_date.toISOString().split('T')[0]
    const time = task.due_date.toISOString().split('T')[1].split('.')[0]

    if (currentTime > dueTime && !task.done) {
      dueDateElement.classList.add('todo-task-due_date--overdue')
    }

    dueDateElement.classList.add('todo-task-due_date')
    dueDateElement.textContent = '* Due date: ' + date + ' ' + time
    taskElement.append(dueDateElement)
  }

  // if description exist
  if (task.description) {
    const descriptionElement = document.createElement('p')

    descriptionElement.classList.add('todo-task-description')
    descriptionElement.textContent = 'Description: ' + task.description

    taskElement.append(descriptionElement)
  }

  // append task to todolist
  todoListElement.append(taskElement)
}

function setTaskDone(target) {
  const task = target.closest('.todo-task')

  task.classList.toggle('todo-task--done')

  if (isAllCheckboxElement.checked) {
    task.style.display = 'block'
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

function createNewTask(target) {
  const id = tasksArray.length + 1
  const title = target.title.value.trim()
  const done = false
  const description = target.description.value.trim() || undefined
  const due_date = target.dueDate.value
    ? new Date(target.dueDate.value.split('T').join(' '))
    : undefined

  if (!title) return

  const newTask = {
    id,
    title,
    done,
    due_date,
    description,
  }

  tasksArray.push(newTask)

  appendTaskToListElement(newTask)

  target.reset()
}
