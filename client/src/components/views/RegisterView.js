import React, { Component } from "react";
import Loader from "react-loader-spinner";

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      login: "",
      password: "",
      errors: {
        loginLength: false,
        passwordLength: false,
        loginExists: false,
      },
      connectionFailMessage: false,
    };
  }
  errorMessages = {
    loginLengthMessage: "Login musi być dłuższy niż 3 litery",
    passwordLengthMessage: "Hasło musi być dłuższe niż 3 litery",
    loginExistsMessage: "Taki login już istnieje.",
  };

  // -- function used to handle user changes in register inputs  -- //
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

  // -- function used to handle register submit -- //
  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const login = this.state.login;
    const password = this.state.password;
    const validation = this.registerValidation();
    // -- validation checks if login and password are longer than 3 characters -- //
    if (validation.correct) {
      this.setState({ loading: true });
      // -- fetching from database if given register login is already in use -- //
      fetch(`http://localhost:9000/requestAPI/userlist?login=${login}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length != 0) {
            // -- if login already exists it prompts an error message -- //
            let errors = { ...this.state.errors };
            errors["loginExists"] = true;
            this.setState({
              loading: false,
              errors,
              password: "",
            });
          } else {
            // -- if login is available user is created with given login and password -- //
            fetch(`http://localhost:9000/requestAPI/addUser`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ login: login, password: password }),
            })
              .then((res) => res.json())
              .then((res) => {
                this.props.handleJustRegisteredState();
                let errors = { ...this.state.errors };
                errors["loginExists"] = false;
                this.setState({
                  loading: false,
                  login: "",
                  password: "",
                });
                this.props.history.push("/");
              })
              .catch((err) => err);
          }
        })
        // -- for handling error if connection to database wasn't acquired -- //
        .catch((err) =>
          this.setState({
            loading: false,
            connectionFailMessage: true,
          })
        );
    } else {
      // -- for handling input validation -- //
      let errors = { ...this.state.errors };
      errors["loginLength"] = !validation.login;
      errors["passwordLength"] = !validation.password;
      errors["loginExists"] = false;
      this.setState({
        errors,
      });
    }
  };

  // -- function for validating if input values are longer than 3 characters -- //
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
        {this.state.loading && (
          <Loader
            className="spinner"
            type="TailSpin"
            color="#40cac6"
            height={100}
            width={100}
          />
        )}
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
          {this.state.connectionFailMessage && (
            <p className="forms__error-text">
              Oops, wygląda na to, że nie mam połączenia z bazą danych, spróbuj
              trybu gościa ;)
            </p>
          )}
        </form>
      </>
    );
  }
}

export default RegisterView;
