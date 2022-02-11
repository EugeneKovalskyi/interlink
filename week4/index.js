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

for (let task of tasksArray) {
  const currentTime = new Date().getTime()
  const todoListElement = document.querySelector('.todo .todo-list')
  const taskElement = document.createElement('div')
  const titleElement = document.createElement('label')
  const doneElement = document.createElement('input')

  taskElement.classList.add('todo-task')

  doneElement.classList.add('todo-task-checkbox', 'form-check-input')
  doneElement.setAttribute('type', 'checkbox')
  doneElement.setAttribute('id', `task${task.id}`)
  doneElement.setAttribute('name', `task${task.id}`)
  doneElement.setAttribute('value', `${task.done}`)

  if (task.done) doneElement.setAttribute('checked', null)

  titleElement.classList.add('todo-task-label', 'form-check-label')
  titleElement.setAttribute('for', `task${task.id}`)
  titleElement.textContent = task.title

  taskElement.append(doneElement, titleElement)

  if (task.due_date) {
    const dueTime = task.due_date.getTime()
    console.log(dueTime)
    console.log(currentTime)
    const dueDateElement = document.createElement('span')
    const date = task.due_date.toISOString().split('T')[0]
    const time = task.due_date.toISOString().split('T')[1].split('.')[0]

    if (currentTime > dueTime && !task.done)
      dueDateElement.classList.add('todo-task-due_date--overdue')

    dueDateElement.classList.add('todo-task-due_date')
    dueDateElement.textContent = '* Due date: ' + date + ' ' + time
    taskElement.append(dueDateElement)
  }

  if (task.description) {
    const descriptionElement = document.createElement('p')

    descriptionElement.classList.add('todo-task-description')
    descriptionElement.textContent = task.description

    taskElement.append(descriptionElement)
  }

  todoListElement.append(taskElement)
}
