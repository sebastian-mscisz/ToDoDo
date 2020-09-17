var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7363789",
  password: "XbQlHmSehp",
  database: "sql7363789",
  connectionLimit: 10,
});

module.exports = connection;
