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
import { Api } from "@csea/api";

import { PageLayout } from "@csea/web/components/page-layout";
import Header  from "@csea/web/components/header";
import { SystemsPage } from "@csea/web/pages/systems";
import { SystemCreatePage } from "@csea/web/pages/system-create";
import { SystemUpdatePage } from "@csea/web/pages/system-update";
import { RoleUpdatePage } from "@csea/web/pages/role-update";
import { RolesPage } from "@csea/web/pages/roles";
import { LoginPage } from "@csea/web/pages/login";
import { OwnerConfigPage } from "@csea/web/pages/owner-config";
import { useLogin, LoginHook } from "@csea/web/hooks/login";


export default function App() {
  const navigate = useNavigate();
  const api = Api()
  const { isLoggedIn, logInInfo, logIn, logOut, claims } = useLogin({
    api,
  });
  return (
    <>
      {
        isLoggedIn ? <PageLayout
          header= { <Header
            claims={claims}
            onLogout={logOut}
          />}
          content={
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path={"/system"} element={<SystemsPage api={api} claims={claims} />} />
                <Route path={"/role"} element={<RolesPage api={api}/>} />
                <Route
                  path={"/system/create"}
                  element={<SystemCreatePage api={api}/>}
                />
                <Route
                  path={"/system/update/:id"}
                  element={<SystemUpdatePage api={api} claims={claims}/>}
                />
                <Route
                  path={"/system/:id/role/:roleid"}
                  element={<RoleUpdatePage api={api} />}
                />
              <Route
                path={"/system/:id/role/:roleid/:userid"}
                element={<RoleUpdatePage api={api} />}
              />
                <Route
                  path={"/system/:id/role/:roleid/:groupid/"}
                  element={<RoleUpdatePage api={api} />}
                />
                <Route
                  path={"/system/:id/role/:roleid/:groupid/:post"}
                  element={<RoleUpdatePage api={api} />}
                />
                <Route
                  path={"/owner"}
                  element={<OwnerConfigPage api={api} />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/system" replace />}
                />
              </Routes>
            </Suspense>
          }
        />: <LoginPage
          id={logInInfo.id}
          password={logInInfo.password}
          onSubmit={logIn}
        />
      }
      <ToastContainer position="bottom-right" />
    </>
  );
}
