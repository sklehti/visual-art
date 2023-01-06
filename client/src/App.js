import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageView from "./components/pages/PageView";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Admin from "./components/admin/Admin";

function App() {
  return (
    <Router>
      {/* TODO: doesn't work immediable after page refreshing */}
      {window.location.href.includes("admin") ? <Admin /> : <PageView />}
      {/* <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<PageView />} />
      </Routes> */}
    </Router>
  );
}

export default App;
