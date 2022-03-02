const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// connection with database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Database connected');
});

module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback)
};