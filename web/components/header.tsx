import React from "react";
import { useNavigate } from "react-router-dom";
import { Claims } from "@csea/core/auth";
import useSWR, { useSWRConfig } from "swr";

export const Header = (props: {
  onLogout?: VoidFunction
  claims?: Claims
}) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = React.useState(false);
  const toggle = () => {
    setIsActive(!isActive);
  };

  const { mutate } = useSWRConfig();
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">SmaFa-AUTH</a>
        <div
            className="navbar-burger burger"
            data-target="navMenubd-example"
            onClick={() => toggle()}
          >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div 
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
          id="navMenubd-example"
        >
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => navigate("/system")}>システム</a>
          <a className="navbar-item" onClick={() => navigate("/role")}>ロール</a>
        </div>
        <div className="navbar-end">
          {
            props.claims && props.claims.admin === true ? <a className="navbar-item" onClick={() => navigate("/owner")}>設定</a> : null
          }
          <a className="navbar-item" onClick={() => {
            navigate("/system")
            props.onLogout?.()
          }}>ログアウト</a>

        </div>
      </div>
    </nav>
  );
};
export default Header;
