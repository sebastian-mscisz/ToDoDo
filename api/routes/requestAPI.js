var express = require("express");
var router = express.Router();
// var mysql = require("mysql");
var connectionPool = require('./db');

// var connectionPool = mysql.createPool({
//   host: "sql7.freesqldatabase.com",
//   user: "sql7363789",
//   password: "XbQlHmSehp",
//   database: "sql7363789",
//   connectionLimit: 10,
// });

router.get("/userlist", function (req, res) {
  let login = req.query.login;
  connectionPool.getConnection(function(err, connection) {
    connection.query(
      "SELECT id, login FROM users WHERE login = '" + login + "'",
      function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      }
    );      
    connection.release();     
  })
});
router.get("/logIn", function (req, res) {
  let login = req.query.login;
  let password = req.query.password;
  connectionPool.getConnection(function(err, connection) {
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
    connection.release();     
  })
});

router.get("/tasks", function (req, res) {
  const userId = req.query.userId;
  connectionPool.getConnection(function(err, connection) {
    connection.query(
      "SELECT * FROM tasks WHERE userId = '" + userId + "'",
      function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      }
    );
    connection.release();     
  })
});

router.post("/addUser", function (req, res) {
  let login = req.body.login;
  let password = req.body.password;
  connectionPool.getConnection(function(err, connection) {
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
    connection.release();     
  })
});

router.post("/addTask", function (req, res) {
  let userId = req.body.userId;
  let name = req.body.name;
  let dueDate = req.body.dueDate;
  let tags = req.body.tags;
  connectionPool.getConnection(function(err, connection) {
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
    connection.release();     
  })
});

router.post("/deleteTask", function (req, res) {
  let taskId = req.body.taskId;
  connectionPool.getConnection(function(err, connection) {
    connection.query("DELETE FROM tasks WHERE id = " + taskId, function (
      err,
      result
    ) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
    connection.release();     
  })
});

router.post("/editTask", function (req, res) {
  let taskId = req.body.taskId;
  let name = req.body.name;
  let dueDate = req.body.dueDate;
  let tags = req.body.tags;
  let query;
  query = "name = '" + name + "', dueDate = '" + dueDate + "', tags = '" + tags;
  connectionPool.getConnection(function(err, connection) {
    connection.query(
      "UPDATE tasks SET " + query + "' WHERE id='" + taskId + "'",
      function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      }
    );
    connection.release();     
})
});

router.post("/updateTask", function (req, res) {
  let taskId = req.body.taskId;
  let finished = req.body.finished;
  let finishDate = req.body.finishDate;
  if (finishDate != null) finishDate = `'${finishDate}'`;
  connectionPool.getConnection(function(err, connection) {
    connection.query(
      "UPDATE tasks SET finished=" +
        finished +
        ", finishDate=" +
        finishDate +
        " WHERE id='" +
        taskId +
        "'",
      function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      }
    );
    connection.release();     
  })
});

module.exports = router;
