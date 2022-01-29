const router = require('express').Router()
const controller = require('../controllers/TaskController')
const JoinRoutes = require('./JoinRoutes')

// ??? где обьявлять middleware ???
function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`)
  next()
}

JoinRoutes(router, controller).crud(logRequest)

module.exports = router
