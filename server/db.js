// Connect to db
const Pool = require("pg").Pool

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'webapp'
})

// Export to be used in routes
module.exports = pool;
