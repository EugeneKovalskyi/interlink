const db = require('../todolistDB')

class ListController {
  async find(req, res) {
    try {
      const lists = await db.query('SELECT * FROM lists')

      res.json(lists.rows)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async findById(req, res) {
    try {
      const listId = req.params.listId
      const list = await db.query('SELECT * FROM lists WHERE id=$1', [listId])

      // if (list.rows.length === 0) throw new Error()

      res.json(list.rows)
    } catch (error) {
      res.status(404).json({ error: 'listId not found' })
    }
  }
}

module.exports = new ListController()
