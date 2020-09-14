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

router.get("/userlist", function (req, res) {
  let login = req.query.login;
  connection.query(
    "SELECT id, login FROM users WHERE login = '" + login + "'",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});
router.get("/logIn", function (req, res) {
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

router.get("/tasks", function (req, res) {
  const userId = req.query.userId;
  connection.query(
    "SELECT * FROM tasks WHERE userId = '" + userId + "'",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

router.post("/addUser", function (req, res) {
  let login = req.body.login;
  let password = req.body.password;
  connection.query(
    "INSERT INTO users(login, password) VALUES ('" +
      login +
      "', '" +
      password +
      "')",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

router.post("/addTask", function (req, res) {
  let userId = req.body.userId;
  let name = req.body.name;
  let dueDate = req.body.dueDate;
  let tags = req.body.tags;
  connection.query(
    "INSERT INTO tasks(userId, name, dueDate, finishDate, finished, tags) VALUES ('" +
      userId +
      "', '" +
      name +
      "', '" +
      dueDate +
      "', null, 0,'" +
      tags +
      "')",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

router.post("/deleteTask", function (req, res) {
  let taskId = req.body.taskId;
  connection.query("DELETE FROM tasks WHERE id = " + taskId, function (
    err,
    result
  ) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post("/updateTask", function (req, res) {
  let taskId = req.body.taskId;
  let finished = req.body.finished;
  let finishDate = req.body.finishDate;
  connection.query(
    "UPDATE tasks SET finished=" +
      finished +
      ", finishDate='" +
      finishDate +
      "' WHERE id='" +
      taskId +
      "'",
    function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
