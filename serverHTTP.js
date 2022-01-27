// const http = require('http')
// const port = 3000
// const tasks = [{ name: 'Get tasks' }, { name: 'Create task' }]
// // server
// const server = http.createServer((req, res) => {})

// server.on('request', (req, res) => {
//   logRequest(req)

//   if (req.url === '/tasks') {
//     if (req.method === 'GET') {
//       res.writeHead(200, { 'Content-Type': 'application/json' })
//       res.end(JSON.stringify(tasks) + '\n')
//     } else if (req.method === 'POST') {
//       const data = []

//       req.on('data', (chunk) => data.push(chunk))
//       req.on('end', () => {
//         const task = JSON.parse(data.join(' '))

//         tasks.push(task)

//         res.writeHead(201, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify(tasks) + '\n')
//       })
//     } else {
//       res.writeHead(404, 'Not Found')
//       res.end(JSON.stringify(tasks) + '\n')
//     }
//   } else {
//     res.writeHead(404, 'Not Found')
//     res.end(JSON.stringify(tasks) + '\n')
//   }
// })

// server.listen(port, () => console.log('Server started ', port))

const http = require('http')
const port = 3000
const server = http.createServer((req, res) => {
  logRequest(req)

  const { method, headers, url } = req
  const urlObj = new URL('http://' + url)

  if (method === 'GET') {
    if (url.includes('/headers')) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })

      res.end(JSON.stringify(headers) + '\n')
    } else if (url.includes('/plural')) {
      const number = urlObj.searchParams.get('number')
      const words = urlObj.searchParams.get('forms').split(',')

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(pluralism(number, ...words) + '\n')
    }
  } else if (method === 'POST') {
    const data = []

    req
      .on('data', (chunk) => {
        data.push(chunk)
      })
      .on('end', () => {
        const string = data.toString()
        const wordsObj = countWords(string)

        let uniqueWordsCounter = 0
        let mostOfenWord = ''

        // for (let key of obj) {

        // }

        res.writeHead(201, { 'Content-Type': 'application/json' })
      })
  }
})

server.listen(port, () => console.log('Server started ... '))

function logRequest({ method, url }) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`)
}

function pluralism(num, one, few, many) {
  if ((num % 10 === 1 && num < 5) || (num % 10 === 1 && num > 20)) {
    return `${num} ${one}`
  } else if (num % 10 === 1 && num > 4 && num < 21) {
    return `${num} ${many}`
  } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
    return `${num} ${few}`
  } else return `${num} ${many}`
}

function countWords(string) {
  const obj = {}
  const sentences = string.split('. ')

  for (let word of wordArray) {
    obj[word] ? ++obj[word] : (obj[word] = 1)
  }

  return obj
}
