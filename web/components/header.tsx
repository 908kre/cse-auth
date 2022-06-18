import React from "react";
import PACKAGE from "../package.json";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => navigate("/system")}>CSE-Auth</a>
      </div>
    </nav>
  );
};
export default Header;
