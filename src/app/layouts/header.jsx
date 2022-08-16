import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <nav className="header__list">
      <Link className="header__link" to="/">
        Main
      </Link>
    </nav>
  </header>
);

export default Header;
