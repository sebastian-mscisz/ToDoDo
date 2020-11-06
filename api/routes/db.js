var mysql = require("mysql");

var connectionPool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "1234",
  database: "ex",
  connectionLimit: 10,
});

module.exports = connectionPool;
