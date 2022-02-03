const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/ListController')

router.get('/', controller.find)
router.get('/:listId', controller.findById)

module.exports = router

// const http = require('http')
// const server = http.createServer(callback)

// server.listen(3000, () => console.log('Server started...'))

// function callback(req, res) {
//   if (req.method === 'GET') {
//     if (req.url === '/tasks') {
//       res.writeHeader(200, {
//         'Content-Type': 'application/json',
//       })

//       res.end(req.body)
//     }
//   } else if (req.method === 'POST') {
//     const data = []

//     req
//       .on('data', (chunk) => data.push(chunk))
//       .on('end', createTask(data.join('').toString()))
//   } else {
//     res.writeHead(404, 'Not Found')
//     res.end()
//   }
// }
