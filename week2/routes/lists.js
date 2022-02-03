const router = require('express').Router({ mergeParams: true })
const toggleKNEX = require('../toggleKNEX')
const controller = require(`../controllers/ListController${
  toggleKNEX ? 'KNEX' : ''
}`)

router.get('/', controller.find)
router.get('/:listId', controller.findById)

module.exports = router
