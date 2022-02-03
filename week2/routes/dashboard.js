const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/DashboardController')

router.get('/', controller.getDashboard)

module.exports = router
