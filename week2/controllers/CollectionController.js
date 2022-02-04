const toggleKNEX = require('../toggleKNEX')
const Collection = require(`../models/Collection${toggleKNEX ? 'KNEX' : ''}`)

class CollectionController {
  getCollectionToday(req, res) {
    Collection.getCollectionToday()
      .then((collection) => res.json(collection))
      .catch((error) => {
        console.error(error)
        res.status(500).json(error)
      })
  }
}

module.exports = new CollectionController()
