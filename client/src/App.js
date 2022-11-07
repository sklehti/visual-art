import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageView from "./components/pages/PageView";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Admin from "./components/admin/Admin";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<PageView />} />
      </Routes>
      {/* <PageView /> */}
    </Router>
  );
}

export default App;
