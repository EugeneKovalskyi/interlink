const knex = require('../todolistKNEX')

class TaskKNEX {
  async find(list_id, isAll) {
    const tasks = knex('tasks').where('list_id', list_id)

    return await (isAll ? tasks : tasks.where('done', false))
  }

  async findById(id) {
    const task = await knex('tasks').where('id', id)
    return task[0]
  }

  async create(list_id, title, due_date) {
    const task = await knex('tasks').insert(
      { title, done: false, due_date, list_id },
      '*'
    )
    return task[0]
  }

  async update(id, title, done, due_date) {
    const originalValues = await knex('tasks').where('id', id)

    if (title === undefined) title = originalValues.title
    if (done === undefined) done = originalValues.done
    if (due_date === undefined) due_date = originalValues.due_date

    const task = await knex('tasks')
      .where('id', id)
      .update({ title, done, due_date }, '*')

    return task[0]
  }

  async remove(id) {
    const task = await knex('tasks').where('id', id).del()
    return task[0]
  }
}

module.exports = new TaskKNEX()
