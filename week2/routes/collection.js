const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/CollectionController')

router.get('/today', controller.getCollectionToday)

module.exports = router
