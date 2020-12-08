require('dotenv').config()

//database config
const db = require('./src/config/config');

//express app
const app = require('./src')

db.connect()
app.listen(process.env.HTTP_PORT, () => console.log(`HTTP server status: listening port ${process.env.HTTP_PORT}!`))