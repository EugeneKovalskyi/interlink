#!/usr/bin/env node

const net = require('net')

// массив игроков
const players = []
// игровое поле
let gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0]
// глобальная переменная для хранения статуса игры
let status = gameStatus(gameField)
// крестики ходят первые
let flag = 1

const server = net.createServer((socket) => {
  const port = socket.remotePort

  // отрисовка пустого поля
  // (renderField(gameField))
  // (` ${flag === 1 ? 'x' : '0'}: Enter coordinate from 1 to 9 -->`)

  // pipe
  socket.pipe(process.stdout)

  players.push(socket)

  // data
  socket.on('data', (data) => {
    let answer = data.toString()
    consoleRender(answer, socket)
  })

  // close
  socket.on('close', () => {
    let index = players.indexOf(socket)
    players.splice(index, 1)
    console.log('Closed: ', port)
  })
})

server.listen(1337, '0.0.0.0')

// вывод текущего результата в консоль
function consoleRender(answer, player) {
  let index = answer - 1

  if (!gameField[index]) {
    // вносим изменения в массив gameField
    makeTurn(gameField, flag, index)

    console.log(renderField(gameField))

    // смена игрока
    flag = -flag

    player.write(
      `${player === 1 ? 'x' : '0'}: Enter coordinate from 1 to 9 -->`
    )
  } else {
    player.write(' Try another number --> ')
  }

  status = gameStatus(gameField)

  // проверка на перемогу
  switch (status) {
    case 'end':
      console.log(' Dead heat!')
      player.close()
      break

    case 'x':
      console.log(' x won!')
      player.close()
      break

    case '0':
      console.log(' 0 won!')
      player.close()
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
