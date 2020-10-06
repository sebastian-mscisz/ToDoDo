import React, { Component } from "react";
import StartView from "./views/StartView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import ListView from "./views/ListView";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

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
      guestTaskId: 0,
    };
  }

  handleLogIn = (user) => {
    this.setState({
      currentUser: user,
      loggedIn: true,
      guest: false,
      guestTaskId: 0,
    });
    this.getTasks(user.id);
  };

  // -- function for fetching tasks from cloud database for current logged user -- //
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
      tasks: [],
      tasksLoaded: false,
      guest: false,
    });
  };

  // -- function for log in as guest to check app without saving any data to database -- //
  handleGuestMode = () => {
    this.setState({
      loggedIn: false,
      currentUser: "",
      tasks: [],
      tasksLoaded: false,
      guest: true,
    });
    <Redirect to="/list" />;
  };

  // -- function used for toggling task completion -- //
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
      date = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
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
    if (this.state.guest === false) {
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
    }
  };

  // -- for handling task adding to database and in app state if in guest mode -- //
  addTask = (name, dueDate, tags) => {
    if (this.state.guest === false) {
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
    } else if (this.state.guest === true) {
      let tasks = [
        ...this.state.tasks,
        {
          id: this.state.guestTaskId,
          name: name,
          dueDate: dueDate,
          finishDate: null,
          finished: 0,
          tags: tags.join(),
        },
      ];
      this.setState({
        tasks,
        guestTaskId: this.state.guestTaskId + 1,
      });
    }
  };

  // -- for handling task editing in database and in app state -- //
  editTask = (id, name, dueDate, tags) => {
    if (this.state.guest === false) {
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
        .then((res) => {})
        .catch((err) => err);
    }
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
  };

  // -- for handling task deletion in database and in app state if in guest mode -- //
  deleteTask = (id) => {
    if (this.state.guest === false) {
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
    } else if (this.state.guest === true) {
      let tasks = this.state.tasks.filter((task) => task.id != id);
      this.setState({
        tasks,
      });
    }
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="content">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <StartView
                  {...props}
                  handleGuestMode={this.handleGuestMode}
                  handleLogOut={this.handleLogOut}
                  loggedIn={this.state.loggedIn}
                  guestIn={this.state.guest}
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
                this.state.loggedIn || this.state.guest ? (
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
        </div>
        <Footer />
      </Router>
    );
  }
}

export default ToDoDo;
