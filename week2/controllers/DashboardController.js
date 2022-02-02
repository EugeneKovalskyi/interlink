const { rows } = require('pg/lib/defaults')
const db = require('../todolistDB')

class DashboardController {
  async getDashboard(req, res) {
    const currentDate = new Date()

    const todaysTasksAmount = await db.query(
      'SELECT COUNT(title) FROM tasks WHERE due_date=$1',
      [currentDate]
    )

    const dashboard = await db.query(
      'SELECT lists.title, lists.id, COUNT(tasks.done) AS not_done_tasks_amount FROM lists LEFT JOIN tasks ON tasks.list_id = lists.id AND tasks.done=false GROUP BY lists.id ORDER BY lists.id ASC'
    )

    for (let list of dashboard.rows) {
      list.not_done_tasks_amount = +list.not_done_tasks_amount
    }

    res.json({
      todaysTasksAmount: todaysTasksAmount.rows[0].count,
      dashboard: dashboard.rows,
    })
  }
}

module.exports = new DashboardController()
