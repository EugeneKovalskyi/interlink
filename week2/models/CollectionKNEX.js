const knex = require('../todolistKNEX')

class CollectionKNEX {
  async getCollectionToday() {
    const currentDate = new Date()
    const collection = await knex('tasks')
      .leftJoin('lists', 'tasks.list_id', '=', 'lists.id')
      .select(
        { list_title: 'lists.title' },
        { task_title: 'tasks.title' },
        'tasks.due_date',
        'tasks.done',
        'tasks.id',
        'tasks.description'
      )
      .where('tasks.due_date', currentDate)
      .where('tasks.done', false)

    return collection
  }
}

module.exports = new CollectionKNEX()
