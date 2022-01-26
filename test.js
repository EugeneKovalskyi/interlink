seaBattle()

function seaBattle() {
  const cellValues = new Array(100).fill(' ')

  fillCell(0, 0, cellValues)
  fillCell(0, 1, cellValues)
  fillCell(0, 2, cellValues)
  fillCell(0, 3, cellValues)
  fillCell(8, 5, cellValues)
  fillCell(8, 6, cellValues)
  fillCell(8, 7, cellValues)

  renderBattleground(cellValues)

  // takeShot(0, 1, cellValues)
  // renderBattleground(cellValues)

  // takeShot(2, 5, cellValues)
  // renderBattleground(cellValues)

  // takeShot(4, 5, cellValues)
  // renderBattleground(cellValues)

  // takeShot(6, 8, cellValues)
  // renderBattleground(cellValues)

  // takeShot(0, 1, cellValues)
  // renderBattleground(cellValues)
}

function renderBattleground(cellValues) {
  const chars = 'ABCDEFGHIJ'
  let underline = '   +---+---+---+---+---+---+---+---+---+---|'
  let field = `\n     1   2   3   4   5   6   7   8   9   10\n${underline}\n`

  for (let row = 0; row < 10; row++) {
    field += ` ${chars[row]} ${renderRow(row, cellValues)}|\n${underline}\n`
  }

  console.log(field)
}

function renderRow(row, cellValues) {
  let result = ''

  for (let column = 0; column < 10; column++) {
    result += `| ${cellValues[column + row * 10]} `
  }

  return result
}

function fillCell(row, column, cellValues) {
  cellValues[column + row * 10] = '■'
}

function takeShot(row, column, cellValues, flag) {
  if (cellValues[column + row * 10] === '■') {
    cellValues[column + row * 10] = 'X'
  } else if (cellValues[column + row * 10] === ' ') {
    cellValues[column + row * 10] = '•'
  } else console.log('False fire!')

  return cellValues
}
