import React, { Component } from "react";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      loginFail: false,
      connectionFailMessage: false,
    };
  }

  loginFailMessage = (<p>Zły login lub hasło</p>);

  // -- function used to handle user changes in login inputs  -- //
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

  // -- function used to handle login submit -- //
  handleLoginSubmit = (e) => {
    e.preventDefault();
    const login = this.state.login;
    const password = this.state.password;
    fetch(
      `http://localhost:9000/requestAPI/logIn?login=${login}&password=${password}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res != "") {
          // -- if login and password are correct, user is logged -- //
          this.props.handleLogIn(res[0]);
          this.setState({
            loginFail: false,
          });
        } else {
          // -- if not it prompts incorrect input error -- //
          this.setState({
            login: "",
            password: "",
            loginFail: true,
          });
        }
      })
      // -- for handling error if connection to database wasn't acquired -- //
      .catch((err) =>
        this.setState({
          connectionFailMessage: true,
        })
      );
  };
  render() {
    return (
      <>
        <h1 className="forms__header">Zaloguj się!</h1>
        <form className="forms__form" onSubmit={this.handleLoginSubmit}>
          <input
            className="forms__input"
            onChange={this.handleInputChange}
            type="text"
            name="loginInput"
            id="loginId"
            placeholder="Login"
            value={this.state.login}
          />
          <input
            className="forms__input"
            onChange={this.handleInputChange}
            type="password"
            name="passwordInput"
            id="passwordId"
            placeholder="Hasło"
            value={this.state.password}
          />
          {this.state.loginFail && (
            <p className="forms__error-text">{this.loginFailMessage}</p>
          )}
          <button className="forms__button" type="submit">
            Zaloguj!
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

export default LoginView;
