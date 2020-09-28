import React, { Component } from "react";

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      errors: {
        loginLength: false,
        passwordLength: false,
        loginExists: false,
      },
    };
  }
  errorMessages = {
    loginLengthMessage: "Login musi być dłuższy niż 3 litery",
    passwordLengthMessage: "Hasło musi być dłuższe niż 3 litery",
    loginExistsMessage: "Taki login już istnieje.",
  };

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

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const login = this.state.login;
    const password = this.state.password;
    const validation = this.registerValidation();
    if (validation.correct) {
      fetch(`http://localhost:9000/requestAPI/userlist?login=${login}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length != 0) {
            let errors = { ...this.state.errors };
            errors["loginExists"] = true;
            this.setState({
              errors,
              password: "",
            });
          } else {
            fetch(`http://localhost:9000/requestAPI/addUser`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ login: login, password: password }),
            })
              .then((res) => res.json())
              .then((res) => {
                let errors = { ...this.state.errors };
                errors["loginExists"] = false;
                this.setState({
                  login: "",
                  password: "",
                });
                this.props.history.push("/");
              })
              .catch((err) => err);
          }
        })
        .catch((err) => err);
    } else {
      let errors = { ...this.state.errors };
      errors["loginLength"] = !validation.login;
      errors["passwordLength"] = !validation.password;
      errors["loginExists"] = false;
      this.setState({
        errors,
      });
    }
  };
  registerValidation = () => {
    let login = false;
    let password = false;
    let correct = false;
    if (this.state.login.length > 3) {
      login = true;
    }
    if (this.state.password.length > 3) {
      password = true;
    }
    if (login && password) {
      correct = true;
    }
    return {
      correct,
      login,
      password,
    };
  };
  render() {
    return (
      <>
        <h1 className="forms__header">Zarejestruj się!</h1>
        <form className="forms__form" onSubmit={this.handleRegisterSubmit}>
          <input
            className="forms__input"
            onChange={this.handleInputChange}
            type="text"
            name="loginInput"
            id="loginId"
            placeholder="Login"
            value={this.state.login}
          />
          {this.state.errors.loginLength && (
            <p className="forms__error-text">
              {this.errorMessages.loginLengthMessage}
            </p>
          )}
          {this.state.errors.loginExists && (
            <p className="forms__error-text">
              {this.errorMessages.loginExistsMessage}
            </p>
          )}
          <input
            className="forms__input"
            onChange={this.handleInputChange}
            type="password"
            name="passwordInput"
            id="passwordId"
            placeholder="Hasło"
            value={this.state.password}
          />
          {this.state.errors.passwordLength && (
            <p className="forms__error-text">
              {this.errorMessages.passwordLengthMessage}
            </p>
          )}
          <button className="forms__button" type="submit">
            Zarejestruj!
          </button>
        </form>
      </>
    );
  }
}

export default RegisterView;
