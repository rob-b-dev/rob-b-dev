// Connect to db
const Pool = require("pg").Pool

// Create postgres db instance and export it for connection
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'webapp'
})

module.exports = pool;
