const router = require('express').Router({ mergeParams: true })
const lists = require('./lists')
const tasks = require('./tasks')
const dashboard = require('./dashboard')
const collection = require('./collection')

router.use('/api/dashboard', dashboard)
router.use('/api/collection', collection)
router.use('/api/lists', lists)
router.use('/api/lists/:listId/tasks', tasks)

module.exports = router
