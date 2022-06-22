import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">SmaFa-AUTH</a>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => navigate("/system")}>システム</a>
        <a className="navbar-item" onClick={() => navigate("/role")}>ロール</a>
      </div>
    </nav>
  );
};
export default Header;
