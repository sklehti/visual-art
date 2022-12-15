import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Kaukoimg from "../../images/kauko-image.jpeg";

function ArtistInfo() {
  return (
    <div id="artist-information" style={{ paddingTop: "100px" }}>
      <h2 className="all-titles">Tietoa taiteilijasta:</h2>
      <Row>
        <Col xs={4} md={4}>
          <div className="shadow-lg p-1  artist-img-style">
            <img
              className="artist-style"
              title="Taiteilija Kauko Lehtinen"
              alt="Kaukon omakuva"
              src={Kaukoimg}
              style={{ borderRadius: "10px" }}
            />
          </div>
        </Col>
        <Col>
          <div className="splash1"></div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={7} md={7} className="shadow-lg p-3  artist-info-style">
          <div className="tables-info-style">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </div>
        </Col>
        <Col xs={1} md={1}></Col>
      </Row>
    </div>
  );
}

export default ArtistInfo;
