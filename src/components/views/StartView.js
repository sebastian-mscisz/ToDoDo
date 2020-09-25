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
      {props.loggedIn || props.guestIn ? (
        <NavLink to="/list">
          <button>Do listy zadań!</button>
        </NavLink>
      ) : null}
      {props.guestIn && (
        <p>
          Jesteś zalogowany jako <em>gość</em>
        </p>
      )}
      {!props.guestIn && !props.loggedIn && (
        <p>
          Brak konta? &gt; Kontynuuj jako
          <button onClick={props.handleGuestMode}>
            <NavLink to="/list">Gość</NavLink>
          </button>
          ;)
        </p>
      )}
    </>
  );
};

export default StartView;
