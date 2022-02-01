const router = require('express').Router()
const tasks = require('./tasks')

router.use('/api/tasks', tasks)

module.exports = router
