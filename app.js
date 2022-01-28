const express = require('express')
const app = express()
const router = require('./routes')
const dataBase = require('dataBase')

const dataBaseUrl = 'db://localhost/interlink'
dataBase.connect(dataBaseUrl, (error) => {
  err
    ? console.error('Data base connection FAIL: ' + error)
    : console.log('Data base OK')
})

app.use(express.json())
app.use(router)

module.exports = app
