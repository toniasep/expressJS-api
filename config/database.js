const mysql = require('mysql');
 
const koneksi = 
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 8889,
        password: 'root',
        database: 'cyx_todo',
        multipleStatements: true
    });

koneksi.connect((err) => {
    if (err) throw err;
    console.log("DB connection established");
})


module.exports = koneksi;