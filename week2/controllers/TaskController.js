const db = require('../todolistDB')

class TaskController {
  async find(req, res) {
    try {
      const listId = req.params.listId
      const isAll = req.query.all

      const tasks = await db.query(
        `SELECT * FROM tasks WHERE list_id=$1${isAll ? '' : ' AND done=false'}`,
        [listId]
      )

      res.json(tasks.rows)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id
      const task = await db.query('SELECT * FROM tasks WHERE id=$1', [id])

      if (task.rows.length === 0) throw new Error()

      res.json(task.rows[0])
    } catch (error) {
      res.status(404).json({ error: 'id not found' })
    }
  }

  async create(req, res) {
    try {
      const { title, dueDate } = req.body
      const task = await db.query(
        'INSERT INTO tasks (title, done, due_date) values ($1, false, $2) RETURNING *',
        [title, dueDate]
      )

      res.json(task.rows[0])
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async update(req, res) {
    try {
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
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id
      const task = await db.query('DELETE FROM tasks WHERE id=$1', [id])

      res.status(204).json('OK')
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

module.exports = new TaskController()
