const { Pool } = require('pg')

const pool = new Pool({
  user: 'birthdays_app',
  password: '1111',
  port: 5432,
  host: 'localhost',
  database: 'birthdays',
})

async function getEmployees() {
  const employees = await pool.query('SELECT * FROM birthdays')
  pool.end()
  return employees.rows
}

getEmployees().then((employees) => console.log(employees))
