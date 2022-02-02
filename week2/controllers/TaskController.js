const db = require('../todolistDB')

class TaskController {
  async find(req, res) {
    const table = await db.query('SELECT * FROM tasks')

    res.json(table.rows)
  }

  async findById(req, res) {
    const id = req.params.id
    const task = await db.query('SELECT (due_date) FROM tasks WHERE id=$1', [
      id,
    ])

    res.json(task.rows[0].due_date)
  }

  async create(req, res) {
    const { title } = req.body
    const task = await db.query(
      'INSERT INTO tasks (title, done) values ($1, false) RETURNING *',
      [title]
    )

    res.json(task.rows[0])
  }

  async update(req, res) {
    const id = req.params.id
    const originalValues = await db.query('SELECT * FROM tasks WHERE id=$1', [
      id,
    ])

    let { title, done, due_date } = req.body

    if (title === undefined) title = originalValues.rows[0].title
    if (done === undefined) done = originalValues.rows[0].done
    if (due_date === undefined) due_date = originalValues.rows[0].due_date

    const task = await db.query(
      'UPDATE tasks SET title=$1, done=$2, due_date=$3 WHERE id=$4 RETURNING *',
      [title, done, due_date, id]
    )

    res.json(task.rows)
  }

  async remove(req, res) {
    const id = req.params.id
    const task = await db.query('DELETE FROM tasks WHERE id=$1', [id])

    res.status(204).json('OK')
  }
}

module.exports = new TaskController()
