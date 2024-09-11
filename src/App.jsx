import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/login";
import UserProfile from "./pages/userProfile";
import Sidebar from "./base/sidebar";
import "../src/assets/css/index.css";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <UserProfile /> */}
      <Sidebar />
    </>
  );
}

export default App;
