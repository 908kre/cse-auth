import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PageLayout } from "@csea/web/components/page-layout";
import { SystemsPage } from "@csea/web/pages/systems";
import { SystemsCreatePage } from "@csea/web/pages/system-create";
import { SystemsUpdatePage } from "@csea/web/pages/system-update";
import { LoginPage } from "@csea/web/pages/login";
import { useLogin } from "@csea/web/hooks/login";

export default function App() {
  const { isLoggedIn, userId, password } = useLogin();
  return (
    <Router>
      <PageLayout
        content={
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path={"/login"}
                element={
                  <LoginPage
                    id={userId}
                    password={password}
                    onSubmit={async (x) => {
                      console.log(x);
                    }}
                  />
                }
              />
              <Route path={"/system"} element={<SystemsPage />} />
              <Route path={"/system/create"} element={<SystemsCreatePage />} />
              <Route
                path={"/system/update/:id"}
                element={<SystemsUpdatePage />}
              />
            </Routes>
          </Suspense>
        }
      />
    </Router>
  );
}
