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
            Kauko Lehtinen (1. joulukuuta 1925 - 28. marraskuuta 2012) tuli
            tunnetuksi suomalaisena kuvataiteilijana. Ennen kuvataiteilijan uraa
            hän toimi hammasteknikkona vuosina 1948-1956. Kuvataiteen opinnot
            hän suoritti vuosina 1945-1948 ABC-piirustuskoulun kirjekurssilla ja
            kokopäiväiseksi taiteilijaksi hän ryhtyi vuonna 1956. Hän omistautui
            kuvataiteelle lähes elämänsä loppuun asti luoden mittavan
            kuvataidekokoelman. Hänen tauluja läytyy nykyään useasta
            taudemuseosta mm. Valtion, Amos Andersonin, Sara Hildenin ja Wäinö
            Aaltosen taidemuseoista.
          </div>
        </Col>
        <Col xs={1} md={1}></Col>
      </Row>
    </div>
  );
}

export default ArtistInfo;
