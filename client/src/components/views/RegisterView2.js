import React from "react";

const RegisterView = (props) => {
  const { errors, messages } = props;
  return (
    <>
      <form onSubmit={props.handleRegisterSubmit}>
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
        {errors.login && messages.loginMessage}
        {errors.register && messages.registerMessage}
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
        {errors.password && messages.passwordMessage}
        <button type="submit">Zarejestruj!</button>
      </form>
    </>
  );
};

export default RegisterView;
