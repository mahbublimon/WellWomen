const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'mahbublimon',
    password: 'rHj9M@4!v40HkG5H8!Pt',
    database: 'wellwomen'
});

module.exports = pool.promise();