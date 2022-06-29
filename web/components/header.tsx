import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

export const Header = (props: {
  onLogout?: VoidFunction
}) => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig();
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
        <a className="navbar-item" onClick={() => props.onLogout?.()}>ログアウト</a>
      </div>
    </nav>
  );
};
export default Header;
