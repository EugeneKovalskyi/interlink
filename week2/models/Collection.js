const psql = require('../todolistPSQL')

class Collection {
  async getCollectionToday() {
    const currentDate = new Date()
    const collection = await psql.query(
      'SELECT lists.title AS list_title, tasks.title AS task_title, tasks.due_date, tasks.done FROM tasks LEFT JOIN lists ON lists.id = tasks.list_id WHERE tasks.due_date=$1 AND tasks.done=false',
      [currentDate]
    )

    return collection.rows
  }
}

module.exports = new Collection()
