import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import { useSelector, useDispatch } from "react-redux";

// import ImageKauko from "../images/kauko-lehtinen.jpeg";
import PanoramaView from "../images/panorama-view.jpg";
// import HamburgerMenu from "../icons/HamburgerMenu.js";
import ShowroomIcon from "../icons/ShowroomButton";

function Showroom() {
  const titleArraw = [
    "k",
    "a",
    "u",
    "k",
    "o",
    "l",
    "e",
    "h",
    "t",
    "i",
    "n",
    "e",
    "n",
  ];

  const showroomButton = useSelector((state) => state.showroom.value);
  const dispatch = useDispatch();

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
  }, [showroomButton]);

  const handleButtonFalse = () => {
    dispatch({ type: "showroom/showroomFalse", payload: false });
  };

  const handleButtonTrue = () => {
    dispatch({ type: "showroom/showroomTrue", payload: true });
  };

  return (
    <div>
      {showroomButton ? (
        <div>
          <div>
            <a-scene>
              <a-assets>
                <img alt="street view" id="street-view" src={PanoramaView} />
                {/* <img alt="kauko" id="kauko" src={ImageKauko} /> */}
              </a-assets>

              {/* <a-image
                src="#kauko"
                position="-11.9 3 -19.7"
                rotation="0 85.543 0"
                scale="1.460 1.102 2.581"
                width="10"
                height="8"
              ></a-image> */}
              <a-sky
                src="#street-view"
                animation="property: rotation; to: 10 360 10; loop: true; dur: 100000"
              ></a-sky>

              {/* <a-camera>
          <a-cursor
            id="cursor"
            animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
            animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
            animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"
          ></a-cursor>
        </a-camera> */}
            </a-scene>
          </div>

          <div className="flex-container">
            {titleArraw.map((l, index) => (
              <h1 key={index} className="letter">
                {l}
              </h1>
            ))}

            <button className="showroom-button" onClick={handleButtonFalse}>
              <ShowroomIcon />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={handleButtonTrue}>
            <h1>Main page</h1>
          </button>
        </div>
      )}
    </div>
  );
}

export default Showroom;
