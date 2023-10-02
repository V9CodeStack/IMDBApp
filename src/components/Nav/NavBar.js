import React from "react";
import Logo from "./Logo";
import Search from "../../utils/Search";

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
