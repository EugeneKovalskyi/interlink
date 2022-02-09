const psql = require('../todolistPSQL')

class Task {
  async find(list_id, isAll) {
    const allTasksQuery = 'SELECT * FROM tasks WHERE list_id=$1'
    const notDoneTasksQuery = allTasksQuery + ' AND done=false'

    const tasks = await psql.query(isAll ? allTasksQuery : notDoneTasksQuery, [
      list_id,
    ])
    return tasks.rows
  }

  async findById(id) {
    const task = await psql.query('SELECT * FROM tasks WHERE id=$1', [id])
    return task.rows[0]
  }

  async create(list_id, title, due_date) {
    console.log(due_date)
    const task = await psql.query(
      'INSERT INTO tasks (title, done, due_date, list_id) values ($1, false, $2, $3) RETURNING *',
      [title, due_date, list_id]
    )
    console.log(task.rows[0])
    return task.rows[0]
  }

  async update(id, title, done, due_date) {
    const originalValues = await psql.query('SELECT * FROM tasks WHERE id=$1', [
      id,
    ])

    if (title === undefined) title = originalValues.rows[0].title
    if (done === undefined) done = originalValues.rows[0].done
    if (due_date === undefined) due_date = originalValues.rows[0].due_date

    const task = await psql.query(
      'UPDATE tasks SET title=$1, done=$2, due_date=$3 WHERE id=$4 RETURNING *',
      [title, done, due_date, id]
    )

    return task.rows
  }

  async remove(id) {
    const task = await psql.query('DELETE FROM tasks WHERE id=$1', [id])
    return task.rows[0]
  }
}

module.exports = new Task()
