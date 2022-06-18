import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PageLayout } from "@csea/web/components/page-layout";
import { Header } from "@csea/web/components/header";
import { SystemsPage } from "@csea/web/pages/systems";
import { SystemsCreatePage } from "@csea/web/pages/system-create";
import { SystemsUpdatePage } from "@csea/web/pages/system-update";

export default function App() {
  return (
    <Router>
      <PageLayout
        header = {<Header/>}
        content={
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
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
