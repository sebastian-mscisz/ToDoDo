import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <NavLink to="/">
      <button>Home</button>
    </NavLink>
  );
};

export default Header;
