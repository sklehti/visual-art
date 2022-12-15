import React from "react";
import PanoramaView from "../../../images/panorama-view-whiten.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";

function Showroom() {
  return (
    <div id="artist-info" style={{ paddingTop: "20px" }}>
      <h2 className=" all-titles">Näyttelytila:</h2>
      <Row>
        <Col xs={1} md={1}></Col>
        <Col>
          <div
            id="wrapper"
            className="showroom-box"
            title="Näyttelytila esittää Kauko Lehtisen taidetta"
          >
            <a-scene embedded>
              <a-assets>
                <img alt="street view" id="street-view" src={PanoramaView} />
              </a-assets>

              <a-sky
                src="#street-view"
                // TODO: now this works without animation
                // animation="property: rotation; to: 10 360 10; loop: true; dur: 100000"
              ></a-sky>
            </a-scene>
          </div>
        </Col>
        <Col xs={1} md={1}></Col>
      </Row>
    </div>
  );
}

export default Showroom;
