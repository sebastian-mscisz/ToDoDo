import React from "react";

const LoginView = (props) => {
  return (
    <>
      <p>login</p>
      <form onSubmit={props.handleLoginSubmit}>
        <label className="form-check-label" htmlFor="loginId">
          Login:
        </label>
        <input
          onChange={props.handleInputChange}
          type="text"
          name="loginInput"
          id="loginId"
          value={props.login}
        />
        <label className="form-check-label" htmlFor="passwordId">
          Hasło:
        </label>
        <input
          onChange={props.handleInputChange}
          type="password"
          name="passwordInput"
          id="passwordId"
          value={props.password}
        />
        <button type="submit">Zaloguj!</button>
      </form>
    </>
  );
};

export default LoginView;
