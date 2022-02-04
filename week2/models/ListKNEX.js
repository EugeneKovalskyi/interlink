const knex = require('../todolistKNEX')

class ListKNEX {
  async find() {
    const lists = await knex.select().from('lists')
    return lists
  }

  async findById(listId) {
    const list = await knex('lists').where('id', listId)
    return list[0]
  }

  async create(title) {
    const list = await knex('lists').insert({ title }, '*')
    return list[0]
  }

  async remove(listId) {
    const list = await knex('lists').where('id', listId).del()
    return list[0]
  }
}

module.exports = new ListKNEX()
