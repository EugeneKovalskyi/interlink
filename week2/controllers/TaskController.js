const toggleKNEX = require('../toggleKNEX')
const Task = require(`../models/Task${toggleKNEX ? 'KNEX' : ''}`)

class TaskController {
  find(req, res) {
    const listId = req.params.listId
    const isAll = req.query.all

    Task.find(listId, isAll)
      .then((tasks) => res.json(tasks))
      .catch((error) => {
        console.error(error)
        res.status(500).json({ error })
      })
  }

  findById(req, res) {
    const id = req.params.id

    Task.findById(id)
      .then((task) => res.json(task))
      .catch((error) => {
        console.error(error)
        res.status(404).json({ error: 'id not found' })
      })
  }

  create(req, res) {
    const list_id = req.params.listId
    const { title, description, due_date } = req.body

    Task.create(list_id, title, description, due_date)
      .then((task) => res.json(task))
      .catch((error) => {
        console.error(error)
        res.status(500).json({ error })
      })
  }

  update(req, res) {
    const id = req.params.id
    const { title, done, description, due_date } = req.body

    Task.update(id, title, done, description, due_date)
      .then((task) => res.json(task))
      .catch((error) => {
        console.error(error)
        res.status(500).json({ error })
      })
  }

  remove(req, res) {
    const id = req.params.id

    Task.remove(id)
      .then((task) => res.json(task).status(204))
      .catch((error) => {
        console.error(error)
        res.status(500).json({ error })
      })
  }
}

module.exports = new TaskController()
