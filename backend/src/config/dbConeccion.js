const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASS,
    database: process.env.DB
})

module.exports = db.promise();