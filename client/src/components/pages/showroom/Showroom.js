import React from "react";
import PanoramaView from "../../../images/panorama-view.jpg";

function Showroom() {
  return (
    <div>
      <div>
        <div id="wrapper" className="showroom-box">
          <a-scene embedded>
            <a-assets>
              <img alt="street view" id="street-view" src={PanoramaView} />
            </a-assets>

            <a-sky
              src="#street-view"
              animation="property: rotation; to: 10 360 10; loop: true; dur: 100000"
            ></a-sky>
          </a-scene>
        </div>
      </div>
    </div>
  );
}

export default Showroom;
