import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/login";
import "../src/assets/css/index.css";
import Sidebar from "./base/sidebar";
import UserProfile from "./pages/userProfile";
import Multiform from "./components/Multiform";
import TremorDrawer from "./base/TremorDrawer";

import { TestAccount } from "./components/test/TestAccount";
import { TestReport } from "./components/test/TestReport";
import { InspectionProvider } from "./components/provider/InspectionProvider";
import MultiformRe from "./components/MultiformRe";
import TremorAddInspector from "./components/TremorAddInspector";
import TremorInspectorList from "./components/TremorInspectorList";
import NotFound from "./components/NotFound";
import TremorInspectionList from "./components/test/TremorInspectionList";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <UserProfile /> */}
      {/* <Sidebar /> */}
      {/* <TremorDrawer /> */}
      <InspectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TremorDrawer />}>
              {/* <Route path="/" element={<TremorInspectorList />} /> */}
              <Route path="/" element={<Multiform />} />
              <Route path="evaluate" element={<Multiform />} />
              <Route path="reevaluate" element={<MultiformRe />} />
              <Route path="reports" element={<TestReport />} />
              <Route path="inspector" element={<TremorAddInspector />} />
              <Route path="inspection" element={<TremorInspectionList />} />
              {/* <Route path="account" element={<TestAccount />} /> */}

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </InspectionProvider>
    </>
  );
}

export default App;
