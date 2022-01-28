const router = require('express').Router()

const controller = require('../controllers/GuestController')
const RestfulRoutes = require('./RestuflRoutes')

RestfulRoutes(router, controller).crud()

module.exports = router
