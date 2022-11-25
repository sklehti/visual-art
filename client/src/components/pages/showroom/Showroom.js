import React from "react";
// import PanoramaView from "../../../images/panorama-view.jpg";
import PanoramaView from "../../../images/panorama-view-whiten.png";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";

function Showroom() {
  //TODO: It's not responsive yet. Check biggest scene, does'n work right there.

  return (
    <Row>
      <Col xs={1} md={1}></Col>
      <Col>
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
      </Col>
      <Col xs={1} md={1}></Col>
    </Row>
  );
}

export default Showroom;
