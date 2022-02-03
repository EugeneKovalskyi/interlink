const router = require('express').Router({ mergeParams: true })
const toggleKNEX = require('../toggleKNEX')
const controller = require(`../controllers/DashboardController${
  toggleKNEX ? 'KNEX' : ''
}`)

router.get('/', controller.getDashboard)

module.exports = router
