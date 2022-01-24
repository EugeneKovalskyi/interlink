// task 1
function pluralism(num, one, few, many) {
  if ((num % 10 === 1 && num < 5) || (num % 10 === 1 && num > 20)) {
    return `${num} ${one}`
  } else if (num % 10 === 1 && num > 4 && num < 21) {
    return `${num} ${many}`
  } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
    return `${num} ${few}`
  } else return `${num} ${many}`
}

// task 2
function sum(...params) {
  return params.reduce((sum, curr) =>
    Number.isInteger(curr) ? sum + curr : sum
  )
}

// task 3
function factorial(num) {
  return num > 1 ? num * factorial(--num) : num
}

// task 4
function printTask(index, { title, done, desc, dueDate }) {
  // let [, month, day] = dueDate.toString().split(' ')
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

// task 5
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

// task 6
const readline = require('readline')
const { stdin: input, stdout: output } = process
const rl = readline.createInterface({ input, output })

// тестовое поле
let gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0]
// глобальная переменная для хранения статуса игры
let status = gameStatus(gameField)
// крестики ходят первые
let player = 1

// отрисовка пустого поля
console.log(renderField(gameField))
console.log(` ${player === 1 ? 'x' : '0'}: Enter coordinate from 1 to 9 -->`)

// слушатель ввода
rl.on('line', consoleRender)

// вывод текущего результата в консоль
function consoleRender(answer) {
  let index = answer - 1

  if (!gameField[index]) {
    // вносим изменения в массив gameField
    makeTurn(gameField, player, index)

    console.log(renderField(gameField))

    // смена игрока
    player = -player

    rl.setPrompt(
      ` ${player === 1 ? 'x' : '0'}: Enter coordinate from 1 to 9 -->`
    )
  } else {
    rl.setPrompt(' Try another number --> ')
  }

  rl.prompt()

  status = gameStatus(gameField)

  // проверка на перемогу
  switch (status) {
    case 'end':
      console.log(' Dead heat!')
      rl.close()
      break

    case 'x':
      console.log(' x won!')
      rl.close()
      break

    case '0':
      console.log(' 0 won!')
      rl.close()
      break
  }
}

// отрисовать поле
function renderField(field) {
  const horizontalLine = '---+---+---'
  let fieldSymbols = []
  let output = ''

  for (let i = 0; i < field.length; i++) {
    switch (field[i]) {
      case -1:
        fieldSymbols[i] = '0'
        break
      case 1:
        fieldSymbols[i] = 'x'

        break
      default:
        fieldSymbols[i] = ' '
        break
    }
  }

  // вид поля
  output = ` ${fieldSymbols[0]} | ${fieldSymbols[1]} | ${fieldSymbols[2]}\n${horizontalLine}\n ${fieldSymbols[3]} | ${fieldSymbols[4]} | ${fieldSymbols[5]}\n${horizontalLine}\n ${fieldSymbols[6]} | ${fieldSymbols[7]} | ${fieldSymbols[8]}\n`

  return output
}

// проверить статус игры
function gameStatus(field) {
  // массив с комбинациями
  let comboArray = [
    field[0] + field[1] + field[2],
    field[3] + field[4] + field[5],
    field[6] + field[7] + field[8],
    field[0] + field[3] + field[6],
    field[1] + field[4] + field[7],
    field[2] + field[5] + field[8],
    field[0] + field[4] + field[8],
    field[2] + field[4] + field[6],
  ]

  for (let combo of comboArray) {
    if (combo === 3) {
      return 'x'
    } else if (combo === -3) {
      return '0'
    }
  }

  for (let value of field) {
    if (value === 0) return 'turn'
  }

  return 'end'
}

// выполнить ход
function makeTurn(field, player, index) {
  if (!field[index]) {
    field[index] = player
    return true
  }

  return false
}
