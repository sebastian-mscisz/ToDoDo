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
      login: "",
      password: "",
      loggedIn: false,
      currentUser: "",
      tasks: null,
      tasksLoaded: false,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "loginInput") {
      this.setState({
        login: value,
      });
    } else if (name === "passwordInput") {
      this.setState({
        password: value,
      });
    }
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.loginVerification();
    this.setState({
      login: "",
      password: "",
    });
  };

  getTasks = (id) => {
    fetch(`http://localhost:9000/requestAPI/tasks?userId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res != "") {
          this.setState({ tasks: res, tasksLoaded: true });
        }
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

  loginVerification() {
    const login = this.state.login;
    const password = this.state.password;
    this.getTasks();
    fetch(
      `http://localhost:9000/requestAPI/userlist?login=${login}&password=${password}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res != "") {
          this.setState({ currentUser: res[0], loggedIn: true });
          this.getTasks(res[0].id);
        }
      })
      .catch((err) => err);
  }

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
                <LoginView
                  {...props}
                  handleLoginSubmit={this.handleLoginSubmit}
                  handleInputChange={this.handleInputChange}
                  tasksLoaded={this.state.tasksLoaded}
                  login={this.state.login}
                  password={this.state.password}
                />
              )
            }
          />
          <Route path="/register" exact component={RegisterView} />
          <Route
            path="/list"
            exact
            render={(props) =>
              this.state.loggedIn ? (
                <ListView {...props} tasks={this.state.tasks} />
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
