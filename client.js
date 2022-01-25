const net = require('net')

let client = new net.Socket()

client.connect(1337, '10.177.1.11', () => {
  console.log('\nConnected!\n')
  client.write('Hello, server!\n')
})

client.on('data', (data) => {
  console.log('Received: ', data)
  client.destroy()
})

client.on('close', () => {
  console.log('\nConnection closed!\n')
})
