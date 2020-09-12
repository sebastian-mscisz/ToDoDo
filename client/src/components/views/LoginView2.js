import React from "react";

const LoginView = (props) => {
  const { errors, messages, handleLoginSubmit, handleInputChange } = props;
  return (
    <>
      <p>login</p>
      <form onSubmit={handleLoginSubmit}>
        <label className="form-check-label" htmlFor="loginId">
          Login:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          name="loginInput"
          id="loginId"
          value={props.login}
        />
        {errors.login && messages.loginMessage}
        <label className="form-check-label" htmlFor="passwordId">
          Hasło:
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="passwordInput"
          id="passwordId"
          value={props.password}
        />
        {errors.incorrectLogin && messages.incorrectLoginMessage}
        <button type="submit">Zaloguj!</button>
      </form>
    </>
  );
};

export default LoginView;
