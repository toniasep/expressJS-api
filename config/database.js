const mysql = require('mysql');
 
const koneksi = 
    mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DBNAME,
        multipleStatements: true
    });

koneksi.connect((err) => {
    if (err) throw err;
    console.log("DB connection established");
})


module.exports = koneksi;