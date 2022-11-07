import React from "react";

const Test1 = () => {
  return <div id="test_1">testi 1</div>;
};

const Test2 = () => {
  return <div id="test_2">testi 2</div>;
};

const WelcomePage = () => {
  return (
    <div>
      <Test1 />
      <Test2 />
    </div>
  );
};

export default WelcomePage;
