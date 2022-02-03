const router = require('express').Router({ mergeParams: true })
const toggleKNEX = require('../toggleKNEX')
const controller = require(`../controllers/CollectionController${
  toggleKNEX ? 'KNEX' : ''
}`)

router.get('/today', controller.getCollectionToday)

module.exports = router
