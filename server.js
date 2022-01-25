#!/usr/bin/env node

// const net = require('net')

// const server = net.createServer((socket) => {
//   const port = socket.remotePort

//   socket.write('Echo server\r\n')

//   console.log('Client connected. Port: ', port)

//   // socket.pipe(process.stdout)
//   socket.pipe(socket)

//   socket.on('close', () => console.log('Closed: ', port))
// })

// server.listen(1337, '10.177.1.11')

const net = require('net')
const stream = require('stream')

const server = net.createServer((socket) => {
  const clientInfo = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`+ ${clientInfo} - connected`)

  socket.write('Echo server\r\n')
  socket
    .pipe(new ToUpperCaseTransform()) // convert client messages to upper case
    .pipe(socket) // forwards uppercased text back to client

  socket.on('data', (message) => {
    process.stdout.write(`> ${clientInfo} : ${message}`)
  })

  socket.on('close', () => {
    console.log(`- ${clientInfo} - closed`)
  })
})

server.listen(1337, '10.177.1.11')

class ToUpperCaseTransform extends stream.Transform {
  constructor() {
    super()
  }

  _transform(chunk, enc, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  }
}
