const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/ListController')

router.get('/', controller.find)
router.get('/:listId', controller.findById)
router.post('/', controller.create)
router.delete('/:listId', controller.remove)

module.exports = router
