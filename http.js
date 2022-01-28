const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  logRequest(req)

  const { method, headers, url } = req
  const urlObj = new URL('http://localhost:3000' + url)

  if (method === 'GET') {
    if (urlObj.pathname === '/headers') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })

      res.end(JSON.stringify(headers) + '\n')
    } else if (urlObj.pathname === '/plural') {
      const number = urlObj.searchParams.get('number')
      const words = decodeURI(urlObj.searchParams.get('forms')).split(',')

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })

      res.end(pluralism(number, ...words) + '\n')
    } else {
      res.writeHead(404, 'Not found')
      res.end()
    }
  } else if (method === 'POST') {
    const data = []

    req
      .on('data', (chunk) => {
        data.push(chunk)
      })
      .on('end', () => {
        const string = data.join('')
        const wordsObj = countWords(string)

        let uniqueWordsCounter = 0
        let mostOfenWord = ''

        for (let key in wordsObj) {
          uniqueWordsCounter++

          if (mostOfenWord) {
            if (wordsObj[mostOfenWord] < wordsObj[key]) {
              mostOfenWord = key
            }
          } else {
            mostOfenWord = key
          }
        }

        res.setHeader('Unique-Words-Number', uniqueWordsCounter)
        res.setHeader('Most-Often-Word', mostOfenWord)

        res.writeHead(201, {
          'Content-Type': 'application/json',
        })

        res.end(JSON.stringify(wordsObj) + '\n')
      })
  } else {
    res.writeHead(404, 'Not found')
    res.end()
  }
})

server.listen(port, () => console.log('Server started ... '))

///////////////////// FUNCTIONS /////////////////

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
  const wordArray = string.split('. ').join(' ').split(' ')

  for (let word of wordArray) {
    word = word.toLowerCase()
    obj[word] ? ++obj[word] : (obj[word] = 1)
  }

  return obj
}
