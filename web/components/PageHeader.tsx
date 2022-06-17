import React from "react";
// import styled from "styled-components";
// import { observer } from "mobx-react-lite";
import classnames from "classnames";
// import { useTranslation } from "react-i18next";
// import ProfileIcon from "@fpalm-auth/web/components/ProfileIcon";
import { HashRouter as Router, NavLink } from "react-router-dom";
// import { Role } from "@fpalm-auth/web/models";
// import store from "@fpalm-auth/web/store";
import { Role } from "../models";
// const Brand = styled.span`
//   font-family: Impact;
//   font-size: 1.5em;
// `;

export const PageHeader = (() => {
  // const { session, userForm, routerStore } = store;
  // const { signOut, claims } = session;
  // const role = claims?.role;

  const [isActive, setIsActive] = React.useState(false);
  // const { t } = useTranslation();
  const toggle = () => {
    setIsActive(!isActive);
  };
  // const user = store.session.user

  return (
    <Router>
      <div className="navbar is-light" style={{ zIndex: 30 }}>
        <div className="navbar-brand">
          <span
            className="navbar-item"
            style={{
              fontFamily: 'Impact',
              fontSize: '1.5em'
            }}>
              SmaFaAuth v1.0.0
          </span>
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
        className={classnames("navbar-menu", isActive ? "is-active" : null)}
         
        id="navMenubd-example"
        >
          <div className="navbar-start">

            <NavLink
              // className="navbar-item"
              // activeClassName="is-active"
              className={classnames("navbar-item", isActive ? "is-active" : null)}
              to="/system"
            >
              {("システム")}
            </NavLink>
            {/* {((role.code === 'Owner' && Role.charge ===system.id) 
            || (role.code === 'Maintainer' && Role.charge.include(system.id) ))
            && ( */}

              <NavLink
              //   className="navbar-item"
              //   activeClassName="is-active"
                className={classnames("navbar-item", isActive ? "is-active" : null)}
                to="/role"
                >
                {("ロール")}
              </NavLink>
            {/* )} */}
          </div>
          <div className="navbar-end">
            {/* {user && (
              <a
                className="navbar-item"
                onClick={() => userForm.init(user.id)}
              >
                <ProfileIcon user={user} />
              </a>
            )} */}

            <a className="navbar-item" 
            // onClick={store.fetchAll}
            >
              <i className="fas fa-sync-alt"></i>
            </a>
            <a className="navbar-item" href="./docs/" target="_blank">
              <i className="fas fa-question"></i>
            </a>
            <NavLink 
              className="navbar-item" 
              to="/login"
              onClick={() => {
                // session.signOut()
                window.location.reload()
              }}
            >
              <i className="fas fa-sign-out-alt" />
              {("logout")}
            </NavLink>
          </div>
        </div>
      </div>

    </Router>
  );
});

export default PageHeader;
