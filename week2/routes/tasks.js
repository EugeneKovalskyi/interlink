const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/TaskController')

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.post('/', controller.create)

router.patch('/:id', controller.update)

router.delete('/:id', controller.remove)

module.exports = router
