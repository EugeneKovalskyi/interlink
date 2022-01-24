// task 7
let string = 'some long string some short string some color of my home'

function countWords(string) {
  let obj = {}
  let wordArray = string.split(' ')

  for (let word of wordArray) {
    obj[word] ? ++obj[word] : (obj[word] = 1)
  }

  return obj
}

// task 8
const array = [
  {
    name: 'Ergo',
    birthday: '2008-01-27',
  },
  {
    name: 'Vasya',
    birthday: '1998-02-12',
  },
  {
    name: 'Oleg',
    birthday: '2005-03-15',
  },
  {
    name: 'Nick',
    birthday: '2002-02-23',
  },
  {
    name: 'John',
    birthday: '2001-12-27',
  },
  {
    name: 'Angelo',
    birthday: '2007-01-03',
  },
]

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

render(array, 2)

function render(workers, horizon) {
  const map = sortWorkers(workers)
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  let result = ''

  for (let i = currentMonth; i <= currentMonth + horizon; i++) {
    if (map.has(i)) {
      let workersArray = map.get(i)
      result += renderMonth(i, currentYear)

      for (let j = 0; j < workersArray.length; j++) {
        result += renderWorker(workersArray[j], currentYear)
      }
    } else if (i === 12) {
      for (i = 0; i < horizon; i++) {
        workersArray = map.get(i)
        result += renderMonth(i, currentYear + 1)

        for (let k = 0; k < workersArray.length; k++) {
          result += renderWorker(workersArray[k], currentYear + 1)
        }
      }

      break
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
