const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Cambia según tu config
    password: '', // Cambia según tu config
    database: 'minierp_db',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();