// pluralism
function pluralism(num, one, few, many) {
  if ((num % 10 === 1 && num < 5) || (num % 10 === 1 && num > 20)) {
    return `${num} ${one}`
  } else if (num % 10 === 1 && num > 4 && num < 21) {
    return `${num} ${many}`
  } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
    return `${num} ${few}`
  } else return `${num} ${many}`
}

// summ
function sum(...params) {
  return params.reduce((sum, curr) =>
    Number.isInteger(curr) ? sum + curr : sum
  )
}

// factorial
function factorial(num) {
  return num > 1 ? num * factorial(--num) : num
}

// printTask
function printTask(index, { title, done, desc, dueDate }) {
  return console.log(
    `${index}. [${done ? 'x' : ' '}] ${title} ${
      dueDate
        ? '(' +
          dueDate.toLocaleString('en', { month: 'short' }) +
          ' ' +
          dueDate.getDate() +
          ')'
        : ''
    }${desc ? '\n   ' + desc : ''}`
  )
}

// class Task
class Task {
  constructor(obj) {
    if (typeof obj === 'object') {
      Object.assign(this, obj)
    }

    this.done = !!this.done
  }

  toggle() {
    this.done = !this.done
  }

  isOverdue() {
    let currentDate = new Date()
    return currentDate > this.dueDate
  }

  postpone(timeSpan) {
    if (timeSpan.hours) {
      this.dueDate = this.dueDate.getTime() + timeSpan.hours * 3600 * 1000
    }

    if (timeSpan.days) {
      this.dueDate = this.dueDate.getTime() + timeSpan.days * 24 * 3600 * 1000
    }

    this.dueDate = new Date(this.dueDate)
  }

  toString() {
    return `${this.id}. [${this.done ? 'x' : ' '}] ${this.title} ${
      this.dueDate
        ? '(' +
          this.dueDate.toLocaleString('en', { month: 'short' }) +
          ' ' +
          this.dueDate.getDate() +
          ')'
        : ''
    }${this.desc ? '\n   ' + this.desc : ''}`
  }
}

// Wordscounter
let string = 'some long string some short string some color of my home'

function countWords(string) {
  let obj = {}
  let wordArray = string.split(' ')

  for (let word of wordArray) {
    obj[word] ? ++obj[word] : (obj[word] = 1)
  }

  return obj
}
