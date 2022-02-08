const psql = require('../todolistPSQL')

class Dashboard {
  async getDashboard() {
    const currentDate = new Date()
    const result = {}

    const todaysTasksAmount = await psql.query(
      'SELECT COUNT(title) FROM tasks WHERE due_date=$1',
      [currentDate]
    )

    const dashboard = await psql.query(
      'SELECT lists.title, lists.id, COUNT(tasks.done) AS pending_tasks_amount FROM lists LEFT JOIN tasks ON tasks.list_id = lists.id AND tasks.done=false GROUP BY lists.id ORDER BY lists.id ASC'
    )

    result.todaysTasksAmount = todaysTasksAmount.rows
    result.dashboard = dashboard.rows

    return result
  }
}

module.exports = new Dashboard()
