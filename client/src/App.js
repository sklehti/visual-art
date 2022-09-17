import React from "react";
import PageView from "./components/pages/PageView";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <PageView />
    </div>
  );
}

export default App;
