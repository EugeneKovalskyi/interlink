const router = require('express').Router()
const controller = require('../controllers/ListController')
const JoinRoutes = require('./JoinRoutes')

JoinRoutes(router, controller).crud(logRequest)

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`)
  next()
}

module.exports = router
