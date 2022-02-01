const db = require('../todolistDB')

class TaskController {
  async find(req, res) {
    const table = await db.query('SELECT * FROM todos')

    res.json(table.rows)
  }

  async findById(req, res) {
    const id = req.params.id
    const task = await db.query('SELECT * FROM todos WHERE id=$1', [id])

    res.json(task.rows)
  }

  async create(req, res) {
    const { title } = req.body
    const task = await db.query(
      'INSERT INTO todos (title, done) values ($1, false) RETURNING *',
      [title]
    )

    res.json(task.rows[0])
  }

  async update(req, res) {
    const id = req.params.id
    const { title, done } = req.body
    const task = await db.query(
      'UPDATE todos SET title=$1, done=$2 WHERE id=$3 RETURNING *',
      [title, done, id]
    )

    res.json(task.rows)
  }

  async remove(req, res) {
    const id = req.params.id
    const task = await db.query('DELETE FROM todos WHERE id=$1', [id])

    res.status(204).json('OK')
  }

  async dashboard(req, res) {
    const currentDate = new Date()
      .toLocaleDateString()
      .split('.')
      .reverse()
      .join('-')

    const tasks = await db.query(
      'SELECT COUNT(due_date) FROM todos WHERE due_date=$1',
      [currentDate]
    )
  }
}

module.exports = new TaskController()
