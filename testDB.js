const { Pool } = require('pg')
const pool = new Pool({
  user: 'birthdays_app',
  password: '1111',
  host: '127.0.0.1',
  port: 5432,
  database: 'birthdays',
})

module.exports = pool
