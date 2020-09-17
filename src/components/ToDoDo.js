import React, { Component } from "react";
import StartView from "./views/StartView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import ListView from "./views/ListView";
import Header from "./layouts/Header";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class ToDoDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: "",
      tasks: [],
      tasksLoaded: false,
      guest: false,
    };
  }

  handleLogIn = (user) => {
    this.setState({
      currentUser: user,
      loggedIn: true,
    });
    this.getTasks(user.id);
  };

  getTasks = (id) => {
    fetch(`http://localhost:9000/requestAPI/tasks?userId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tasks: res,
          tasksLoaded: true,
        });
      })
      .catch((err) => err);
  };

  handleLogOut = () => {
    this.setState({
      loggedIn: false,
      currentUser: "",
      tasks: null,
      tasksLoaded: false,
    });
  };

  toggleFinishTask = (id, value) => {
    const taskIndex = this.state.tasks.findIndex((task) => task.id == id);
    let tasks = [...this.state.tasks];
    let date;
    let stateDate;
    if (value === 0) {
      date = null;
      stateDate = null;
    } else if (value === 1) {
      stateDate = new Date();
      date = new Date();
      date.setHours(date.getHours() + 2);
      date = date.toISOString();
      stateDate = stateDate.toISOString();
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      finished: value,
      finishDate: stateDate,
    };
    this.setState({
      tasks,
    });
    fetch(`http://localhost:9000/requestAPI/updateTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: id,
        finished: value,
        finishDate: date,
      }),
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((err) => err);
  };

  addTask = (name, dueDate, tags) => {
    fetch(`http://localhost:9000/requestAPI/addTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: this.state.currentUser.id,
        name: name,
        dueDate: dueDate,
        tags: tags.join(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.getTasks(this.state.currentUser.id);
      })
      .catch((err) => err);
  };

  editTask = (id, name, dueDate, tags) => {
    fetch(`http://localhost:9000/requestAPI/editTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: id,
        name: name,
        dueDate: dueDate,
        tags: tags.join(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const taskIndex = this.state.tasks.findIndex((task) => task.id == id);
        let tasks = [...this.state.tasks];
        tasks[taskIndex] = {
          ...tasks[taskIndex],
          name: name,
          dueDate: dueDate,
          tags: tags.join(),
        };
        this.setState({
          tasks,
        });
      })
      .catch((err) => err);
  };

  deleteTask = (id) => {
    fetch(`http://localhost:9000/requestAPI/deleteTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.getTasks(this.state.currentUser.id);
      })
      .catch((err) => err);
  };

  componentDidUpdate() {}

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <StartView
                {...props}
                handleLogOut={this.handleLogOut}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={(props) =>
              this.state.tasksLoaded ? (
                <Redirect to="/list" />
              ) : (
                <LoginView {...props} handleLogIn={this.handleLogIn} />
              )
            }
          />
          <Route
            path="/register"
            exact
            render={(props) => <RegisterView {...props} />}
          />
          <Route
            path="/list"
            exact
            render={(props) =>
              this.state.loggedIn ? (
                <ListView
                  {...props}
                  tasks={this.state.tasks}
                  addTask={this.addTask}
                  editTask={this.editTask}
                  deleteTask={this.deleteTask}
                  toggleFinishTask={this.toggleFinishTask}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default ToDoDo;
