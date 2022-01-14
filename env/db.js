const mysql = require('mysql2')

// conection config ======================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pcm'
})

module.exports = db