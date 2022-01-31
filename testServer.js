const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const router = require('./testRoutes')

app.use('/api', router)

app.listen(PORT, () => console.log('Server stared on port:', PORT))
