const psql = require('../todolistPSQL')

class List {
  async find() {
    const lists = await psql.query('SELECT * FROM lists')
    return lists.rows
  }

  async findById(list_id) {
    const list = await psql.query('SELECT * FROM lists WHERE id=$1', [list_id])
    return list.rows[0]
  }

  async create(title) {
    const list = await psql.query(
      'INSERT INTO lists title values $1 RETURNING *',
      title
    )
    return list.rows[0]
  }

  async remove(list_id) {
    const list = await psql.query('DELETE FROM lists WHERE id=$1', [list_id])
    return list.rows[0]
  }
}

module.exports = new List()
