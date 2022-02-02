const router = require('express').Router()
const controller = require('../controllers/DashboardController')

router.get('/', controller.getDashboard)

module.exports = router
