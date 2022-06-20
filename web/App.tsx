import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { PageLayout } from "@csea/web/components/page-layout";
import Header  from "@csea/web/components/header";
import { SystemsPage } from "@csea/web/pages/systems";
import { SystemsCreatePage } from "@csea/web/pages/system-create";
import { SystemsUpdatePage } from "@csea/web/pages/system-update";
import { LoginPage } from "@csea/web/pages/login";
import { useLogin } from "@csea/web/hooks/login";

export default function App() {
  const navigate = useNavigate();
  const { isLoggedIn, logInInfo, logIn } = useLogin({
    onLogin: () => {
      navigate("/system");
    },
  });
  return (
    <PageLayout
      header= { <Header/>}
      content={
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={"/login"}
              element={
                <LoginPage
                  id={logInInfo.id}
                  password={logInInfo.password}
                  onSubmit={logIn}
                />
              }
            />
            {isLoggedIn && (
              <>
                <Route path={"/system"} element={<SystemsPage />} />
                <Route
                  path={"/system/create"}
                  element={<SystemsCreatePage />}
                />
                <Route
                  path={"/system/update/:id"}
                  element={<SystemsUpdatePage />}
                />
              </>
            )}
          </Routes>
        </Suspense>
      }
    />
  );
}
