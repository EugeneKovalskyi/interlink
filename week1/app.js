const express = require('express')
const app = express()
const router = require('./routes')

app.use(express.json())
app.use(logRequest)
app.use(router)

module.exports = app

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`)
  next()
}
