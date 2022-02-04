const toggleKNEX = require('../toggleKNEX')
const Dashboard = require(`../models/Dashboard${toggleKNEX ? 'KNEX' : ''}`)

class DashboardController {
  getDashboard(req, res) {
    Dashboard.getDashboard()
      .then((result) => {
        result.todaysTasksAmount = +result.todaysTasksAmount[0].count

        for (let list of result.dashboard) {
          list.pending_tasks_amount = +list.pending_tasks_amount
        }

        res.json(result)
      })
      .catch((error) => {
        console.error(error)
        res.status(500).json(error)
      })
  }
}

module.exports = new DashboardController()
