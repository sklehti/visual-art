import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import MainImage from "../../../images/main-image-1.jpg";

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
            <img
              alt="Kuvassa kaksi taiteilijan työtä."
              id="street-view"
              src={MainImage}
              className="main-image-style"
            />
          </div>
        </Col>
        <Col xs={1} md={1}></Col>
      </Row>
    </div>
  );
}

export default Showroom;
