import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <button className="header__navbutton">
          <span className="fas fa-home"></span>
        </button>
      </NavLink>
    </header>
  );
};

export default Header;
