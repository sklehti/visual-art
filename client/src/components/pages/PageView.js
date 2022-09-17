import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import AnchorLink from "react-anchor-link-smooth-scroll";
import WelcomePage from "./WelcomePage";
import Showroom from "./showroom/Showroom";
import ShowroomIcon from "../icons/ShowroomButton";

function PageView() {
  const titleArraw = [
    "K",
    "a",
    "u",
    "k",
    "o",
    "L",
    "e",
    "h",
    "t",
    "i",
    "n",
    "e",
    "n",
  ];

  useEffect(() => {
    anime({
      targets: ".letter",
      opacity: 1,
      //TODO: seuraava rivi vaihtaa korkeutta
      // translateY: 50,
      scale: anime.stagger([0.7, 1], { from: "center" }),
      delay: anime.stagger(100, { start: 600 }),
      // translateX: [-10, 30],
    });
  }, []);

  const handleButton = () => {
    console.log("make same actions here..");
  };

  return (
    <div>
      <div className="flex-container">
        {titleArraw.map((l, index) => (
          <h1 key={index} className="letter">
            {l}
          </h1>
        ))}

        <button className="showroom-button" onClick={handleButton}>
          <ShowroomIcon />
        </button>
      </div>
      <h2 align="center">
        <AnchorLink href="#test_1">
          <button className="anchor-button">Test 1</button>
        </AnchorLink>
        <AnchorLink href="#test_2">
          <button className="anchor-button">Test 2</button>
        </AnchorLink>
      </h2>
      <Showroom />
      <WelcomePage />
    </div>
  );
}

export default PageView;
