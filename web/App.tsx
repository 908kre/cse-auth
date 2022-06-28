import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { PageLayout } from "@csea/web/components/page-layout";
import Header  from "@csea/web/components/header";
import { SystemsPage } from "@csea/web/pages/systems";
import { SystemCreatePage } from "@csea/web/pages/system-create";
import { SystemUpdatePage } from "@csea/web/pages/system-update";
import { RoleUpdatePage } from "@csea/web/pages/role-update";
import { RolesPage } from "@csea/web/pages/roles";
import { LoginPage } from "@csea/web/pages/login";
import { useLogin, LoginHook } from "@csea/web/hooks/login";


export default function App() {
  const navigate = useNavigate();
  const { isLoggedIn, logInInfo, logIn, logOut } = useLogin();
  if(!isLoggedIn){
    return <LoginPage
      id={logInInfo.id}
      password={logInInfo.password}
      onSubmit={logIn}
    />
  }
  return (
    <PageLayout
      header= { <Header
        onLogout={logOut}
      />}
      content={
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/system"} element={<SystemsPage />} />
            <Route path={"/role"} element={<RolesPage />} />
            <Route
              path={"/system/create"}
              element={<SystemCreatePage />}
            />
            <Route
              path={"/system/update/:id"}
              element={<SystemUpdatePage />}
            />
            <Route
              path={"/system/:id/role/:roleid"}
              element={<RoleUpdatePage />}
            />
            <Route
              path="*"
              element={<Navigate to="/system" replace />}
            />
          </Routes>
          <ToastContainer position="bottom-right" />
        </Suspense>
      }
    />
  );
}
