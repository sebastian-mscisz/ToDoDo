// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "sql7.freesqldatabase.com",
//   user: "sql7363789",
//   password: "XbQlHmSehp",
//   database: "sql7363789",
//   connectionLimit: 10,
// });

const mysql = require("mysql");

var config = {
  host: "tododo.mysql.database.azure.com",
  user: "artuks@tododo",
  password: "Sebmsc1356",
  database: "ToDoDoBase",
  port: 3306,
  ssl: true,
  connectionLimit: 10,
};

const connection = new mysql.createConnection(config);

// connection.connect(function (err) {
//   if (err) {
//     console.log("!!! Cannot connect !!! Error:");
//     throw err;
//   } else {
//     console.log("Connection established.");
//   }
// });

module.exports = connection;
