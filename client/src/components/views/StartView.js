import React from "react";
import { NavLink } from "react-router-dom";
import dodoImg from "../assets/dodo.png";

const StartView = (props) => {
  return (
    <>
      <h1 className="start-view__header">ToDoDo !</h1>
      <img className="start-view__logo" alt="Dodo" src={dodoImg} />
      <div className="start-view__buttons-group">
        {props.loggedIn || props.guestIn ? (
          <NavLink
            className="start-view__link-button start-view__link-button--tasks"
            to="/list"
          >
            <button className="start-view__button start-view__button--tasks">
              Do listy zadań!
            </button>
          </NavLink>
        ) : null}
        {props.loggedIn ? (
          <NavLink className="start-view__link-button" to="/">
            <button className="start-view__button" onClick={props.handleLogOut}>
              Wyloguj się!
            </button>
          </NavLink>
        ) : (
          <>
            <NavLink className="start-view__link-button" to="/login">
              <button className="start-view__button">Zaloguj się!</button>
            </NavLink>
            <span className="start-view__separator">lub</span>
          </>
        )}
        {props.loggedIn ? null : (
          <NavLink className="start-view__link-button" to="/register">
            <button className="start-view__button">Zarejestruj się!</button>
          </NavLink>
        )}
      </div>
      {props.guestIn && (
        <p className="start-view__guest-info">
          Jesteś w trybie <u>gościa</u> - twoje zmiany nie będą zapisane
        </p>
      )}
      {!props.guestIn && !props.loggedIn && (
        <p className="start-view__guest-info">
          Chcesz przetestować? <br /> Kontynuuj jako&nbsp;
          <span onClick={props.handleGuestMode}>
            <NavLink to="/list">Gość</NavLink>
          </span>
          &nbsp;;)
        </p>
      )}
    </>
  );
};

export default StartView;
