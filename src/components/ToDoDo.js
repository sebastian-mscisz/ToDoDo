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
        this.setState({ tasks: res, tasksLoaded: true });
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

  addTask = (name, dueDate, tags) => {
    let id;
    if (this.state.tasks.length > 0) {
      id = this.state.tasks[this.state.tasks.length - 1].id + 1;
    } else id = 1;
    let tasks = [
      ...this.state.tasks,
      {
        dueDate: dueDate,
        finishDate: null,
        finished: 0,
        id: id,
        name: name,
        tags: tags,
        userId: this.state.currentUser.id,
      },
    ];
    this.setState({ tasks });
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
