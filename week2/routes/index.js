const router = require('express').Router()
const tasks = require('./tasks')
const dashboard = require('./dashboard')

router.use('/api/tasks', tasks)
router.use('/api/dashboard', dashboard)

module.exports = router
