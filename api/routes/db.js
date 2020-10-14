var mysql = require('mysql');

var connectionPool = mysql.createPool({
    host: "sql7.freesqldatabase.com",
    user: "sql7363789",
    password: "XbQlHmSehp",
    database: "sql7363789",
    connectionLimit: 10,
  });

// connectionPool.connect(function(err) {
//     if (err) throw err;
// });

module.exports = connectionPool;