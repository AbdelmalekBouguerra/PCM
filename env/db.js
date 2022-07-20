const mysql = require('mysql2')

// conection config ======================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'abdelmalek',
    password: '',
    database: 'pcm'
})

module.exports = db