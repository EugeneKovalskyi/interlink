const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'todolist_app',
    password: '1111',
    database: 'todolist',
    port: 5432,
    host: 'localhost',
  },
})

module.exports = knex
