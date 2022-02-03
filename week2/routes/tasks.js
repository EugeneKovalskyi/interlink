const router = require('express').Router({ mergeParams: true })
const toggleKNEX = require('../toggleKNEX')
const controller = require(`../controllers/TaskController${
  toggleKNEX ? 'KNEX' : ''
}`)

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.post('/', controller.create)

router.patch('/:id', controller.update)

router.delete('/:id', controller.remove)

module.exports = router
