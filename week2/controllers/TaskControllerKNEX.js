const knex = require('../todolistKNEX')

class TaskController {
  async find(req, res) {
    try {
      const list_id = req.params.listId
      const isAll = req.query.all
      let tasks = null

      if (isAll) {
        tasks = await knex('tasks').where('list_id', list_id)
      } else {
        tasks = await knex('tasks')
          .where('list_id', list_id)
          .where('done', false)
      }

      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id
      const task = await knex('tasks').where('id', id)

      if (task.length === 0) throw new Error()

      res.json(task)
    } catch (error) {
      res.status(404).json({ error: 'id not found' })
    }
  }

  async create(req, res) {
    try {
      const list_id = req.params.listId
      const { title, due_date } = req.body
      const task = await knex('tasks').insert(
        { title, done: false, due_date, list_id },
        ['*']
      )

      res.json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      let { title, done, due_date } = req.body
      const originalValues = await knex('tasks').where('id', id)

      if (title === undefined) title = originalValues.title
      if (done === undefined) done = originalValues.done
      if (due_date === undefined) due_date = originalValues.due_date
      const task = await knex('tasks')
        .where('id', id)
        .update({ title, done, due_date }, ['*'])

      /////////////////// метод чтобы возращять обьект а не массив
      res.json(task[0])
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id

      const task = await knex('tasks').where('id', id).del()

      res.status(204).json('OK')
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

module.exports = new TaskController()
