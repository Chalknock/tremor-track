import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/login";
import "../src/assets/css/index.css";
import Sidebar from "./base/sidebar";
import UserProfile from "./pages/userProfile";
import Multiform from "./components/Multiform";
import TremorDrawer from "./base/TremorDrawer";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <UserProfile /> */}
      {/* <Sidebar /> */}
      <TremorDrawer />
    </>
  );
}

export default App;
