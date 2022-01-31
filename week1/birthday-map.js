let months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const array = []
const args = process.argv.slice(2)
const csv = require('csv-parser')
const fs = require('fs')

fs.createReadStream(args[0])
  .pipe(csv())
  .on('data', (data) => array.push(data))
  .on('end', () => {
    render(array, args[1])
  })

function render(workers, horizon) {
  const map = sortWorkers(workers)
  const currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  const currentMonth = 11
  let result = ''

  for (let i = 0; i < horizon; i++) {
    let month = (currentMonth + i) % 12
    let year = currentYear

    if (currentMonth + i > 11) {
      year++
    }

    if (map.has(month)) {
      let workersArray = map.get(month)
      result += renderMonth(month, year)

      for (let j = 0; j < workersArray.length; j++) {
        result += renderWorker(workersArray[j], year)
      }
    }
  }

  console.log(result)
}

function sortWorkers(workers) {
  let map = new Map()

  for (let worker of workers) {
    let month = new Date(worker.birthday).getMonth()

    if (map.has(month)) {
      map.get(month).push(worker)
    } else {
      map.set(month, [worker])
    }

    map.get(month).sort((current, next) => {
      const currentDay = new Date(current.birthday).getDate()
      const nextDay = new Date(next.birthday).getDate()

      return currentDay - nextDay
    })
  }

  return map
}

function renderWorker(worker, currentYear) {
  const day = new Date(worker.birthday).getDate()
  const name = worker.name
  const age = currentYear - new Date(worker.birthday).getFullYear()

  return `(${day}) - ${name} (${age} years)\n`
}

function renderMonth(month, year) {
  return `${months[month]} ${year}\n`
}
