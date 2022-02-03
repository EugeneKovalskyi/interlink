const knex = require('../todolistKNEX')

class CollectionControllerKNEX {
  async getCollectionToday(req, res) {
    try {
      const currentDate = new Date()

      const collection = await knex('tasks')
        .leftJoin('lists', 'tasks.list_id', '=', 'lists.id')
        .select(
          { list_title: 'lists.title' },
          { task_title: 'tasks.title' },
          'tasks.due_date',
          'tasks.done'
        )
        .where('tasks.due_date', currentDate)
        .where('tasks.done', false)

      res.json(collection)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new CollectionControllerKNEX()
