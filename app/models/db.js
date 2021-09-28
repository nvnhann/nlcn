const dbconfig = require('../config/db.config');
const  mysql = require('mysql');

const connect = mysql.createPool({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB
});

connect.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

module.exports = connect;

