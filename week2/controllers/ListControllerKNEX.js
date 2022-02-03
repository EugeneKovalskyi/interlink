const knex = require('../todolistKNEX')

class ListControllerKNEX {
  async find(req, res) {
    try {
      const lists = await knex.select().from('lists')

      res.json(lists)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async findById(req, res) {
    try {
      const listId = req.params.listId
      const list = await knex('lists').where('id', listId)

      res.json(list)
    } catch (error) {
      res.status(404).json({ error: 'listId not found' })
    }
  }
}

module.exports = new ListControllerKNEX()
