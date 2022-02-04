const { Pool } = require('pg')

const pool = new Pool({
  user: 'todolist_app',
  password: '1111',
  port: 5432,
  host: 'localhost',
  database: 'todolist',
})

module.exports = pool
