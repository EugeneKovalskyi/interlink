const toggleKNEX = require('../toggleKNEX')
const List = require(`../models/List${toggleKNEX ? 'KNEX' : ''}`)

class ListController {
  find(req, res) {
    List.find()
      .then((lists) => res.json(lists))
      .catch((error) => res.status(500).json({ error }))
  }

  findById(req, res) {
    const listId = req.params.listId

    List.findById(listId)
      .then((list) => res.json(list))
      .catch((error) => {
        console.error(error)
        res.status(404).json({ error: 'id not found' })
      })
  }

  create(req, res) {
    const { title } = req.body

    List.create(title)
      .then((list) => res.json(list))
      .catch((error) => {
        console.error(error)
        res.status(500).json({ error })
      })
  }

  remove(req, res) {
    const listId = req.params.listId

    List.remove(listId)
      .then((list) => res.status(204).json('OK'))
      .catch((error) => {
        console.error(error)
        res.status(404).json({ error: 'id not found' })
      })
  }
}

module.exports = new ListController()
