import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar bg-light p-2 mb-3">
    <div className="container-fluid">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Main
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
