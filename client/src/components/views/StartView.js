import React from "react";
import { NavLink } from "react-router-dom";

const StartView = (props) => {
  return (
    <>
      <p>start</p>
      {props.loggedIn ? (
        <NavLink to="/">
          <button onClick={props.handleLogOut}>Wyloguj się!</button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <button>Zaloguj się!</button>
        </NavLink>
      )}

      {props.loggedIn ? null : (
        <NavLink to="/register">
          <button>Zarejestruj się!</button>
        </NavLink>
      )}
    </>
  );
};

export default StartView;
