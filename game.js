#!/usr/bin/env node

const net = require('net')

// массив игроков
const players = []
// игровое поле
let gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0]
// глобальная переменная для хранения статуса игры
let status = gameStatus(gameField)
// крестики ходят первые
let currentPlayerMarker = 1

const server = net.createServer((socket) => {
  // const [p1, p2] = currentPlayerMarker === 1 ? players : players.reverse()
  const port = socket.remotePort

  // pipe
  socket.pipe(process.stdout)

  players.push(socket)

  // отрисовка пустого поля
  if (players.length === 2) {
    for (let i = 0; i < players.length; i++) {
      players[i].write(renderField(gameField))
    }

    players[0].write('Enter coordinate from 1 to 9\n')
    players[1].write('Wait for the another player to make a turn...\n')
  } else {
    players[0].write('Please wait for second player...\n')
  }

  // data
  socket.on('data', (data) => {
    let answer = data.toString()

    if (currentPlayerMarker === 1 && players[0] === socket && answer < 10) {
      consoleRender(answer, players[0])
    } else if (
      currentPlayerMarker === -1 &&
      players[1] === socket &&
      answer < 10
    ) {
      consoleRender(answer, players[1])
    }
  })

  // close
  socket.on('close', () => {
    let index = players.indexOf(socket)
    players.splice(index, 1)
    console.log('Closed: ', port)
  })
})

server.listen(1337, '10.177.1.11')

///////////////////// FUNCTIONS /////////////////

// вывод текущего результата в консоль
function consoleRender(answer, currentPlayer) {
  let index = answer - 1

  if (!gameField[index]) {
    // вносим изменения в массив gameField
    makeTurn(gameField, currentPlayerMarker, index)

    for (let player of players) {
      player.write(renderField(gameField))
    }

    status = gameStatus(gameField)

    // проверка на перемогу
    switch (status) {
      case 'end':
        sendAll(' message!')
        return

      case 'x':
        sendAll(' x won!')
        return

      case '0':
        sendAll(' 0 won!')
        return
    }

    // смена игрока
    currentPlayerMarker = -currentPlayerMarker

    if (currentPlayerMarker === 1) {
      players[0].write('Enter coordinate from 1 to 9\n')
      players[1].write('Wait for the another player to make a turn...\n')
    } else {
      players[1].write('Enter coordinate from 1 to 9\n')
      players[0].write('Wait for the another player to make a turn...\n')
    }
  } else {
    currentPlayer.write('Try another number!\n')
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
  output = ` ${fieldSymbols[0]} | ${fieldSymbols[1]} | ${fieldSymbols[2]}\n${horizontalLine}\n ${fieldSymbols[3]} | ${fieldSymbols[4]} | ${fieldSymbols[5]}\n${horizontalLine}\n ${fieldSymbols[6]} | ${fieldSymbols[7]} | ${fieldSymbols[8]}\n\n\n`

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
function makeTurn(field, currentPlayer, index) {
  if (!field[index]) {
    field[index] = currentPlayer
    return true
  }

  return false
}

function sendAll(message) {
  players.forEach((player) => player.write(message))
}
