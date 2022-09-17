import React from "react";
import Showroom from "./components/pages/showroom/Showroom";

import AnchorLink from "react-anchor-link-smooth-scroll";
import WelcomePage from "./components/pages/WelcomePage";
import PageView from "./components/pages/PageView";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <PageView />
      {/* <Showroom /> */}
    </div>
  );
}

export default App;
