import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Kaukoimg from "../../images/Kauko-image.png";

function ArtistInfo() {
  return (
    <div id="artist-info" style={{ paddingTop: "100px" }}>
      <h1 className="all-titles">Tietoa taiteilijasta:</h1>
      <Row>
        <Col xs={4} md={4}>
          {/* TODO: mb-5 tuo alapuolelle vällystä, tarvitaanko sitä? */}
          <div className="shadow-lg p-1  artist-img-style">
            <img
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
        <Col xs={8} md={8} className="shadow-lg p-3  artist-info-style">
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
      </Row>
    </div>
  );
}

export default ArtistInfo;
