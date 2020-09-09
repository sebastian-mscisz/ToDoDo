var express = require("express");
var connection = require("../connection.js");
var router = express.Router();

function handleDisconnect(connection) {
  connection.on("error", function (err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== "PROTOCOL_CONNECTION_LOST") {
      throw err;
    }

    console.log("Re-connecting lost connection: " + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);

router.get("/userlist", function (req, res, next) {
  let login = req.query.login;
  let password = req.query.password;
  connection.query(
    "SELECT id, login FROM users WHERE login = '" +
      login +
      "' && password = '" +
      password +
      "'",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

router.get("/tasks", function (req, res, next) {
  const userId = req.query.userId;
  connection.query(
    "SELECT * FROM tasks WHERE userId = '" + userId + "'",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
