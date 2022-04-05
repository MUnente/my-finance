const { Pool } = require('pg');

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.connect(err => {
    if (err) console.error(`Connection error: ${err.stack}`);
    else console.log('Database Connected');
});

module.exports = {
    query: (sqlQuery, params) => pool.query(sqlQuery, params)
        .then(res => ({ status: 'ok', content: res.rows }))
        .catch(err => ({ status: 'error', content: err }))
};