const knex = require('../todolistKNEX')

class DashboardKNEX {
  async getDashboard() {
    const currentDate = new Date()
    const todaysTasksAmount = await knex('tasks')
      .count('title')
      .where('due_date', currentDate)

    const dashboard = await knex('lists')
      .leftJoin('tasks', function () {
        this.on('lists.id', '=', 'tasks.list_id')
        this.andOn('tasks.done', '=', knex.raw('false'))
      })
      .select('lists.title', 'lists.id')
      .count('tasks.done', { as: 'pending_tasks_amount' })
      .groupBy('lists.id')
      .orderBy('lists.id')

    return { todaysTasksAmount, dashboard }
  }
}

module.exports = new DashboardKNEX()
