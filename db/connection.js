const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: 'rootroot',
        database: 'employee_track_db'
    },
    console.log(`Connected to the database.`)
);

module.exports = db;