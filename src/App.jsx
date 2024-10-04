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
import { TestInspection } from "./components/test/TestInspection";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <UserProfile /> */}
      {/* <Sidebar /> */}
      {/* <TremorDrawer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<TremorDrawer />}>
            <Route path="/" element={<Multiform />} />
            <Route path="evaluate" element={<Multiform />} />
            <Route path="reports" element={<TestReport />} />
            <Route path="inspection" element={<TestInspection />} />
            <Route path="account" element={<TestAccount />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
