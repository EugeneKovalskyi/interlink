const router = require('express').Router()
const lists = require('./lists')

router.use('/api/lists', lists)

module.exports = router
