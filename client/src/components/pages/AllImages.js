import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import ModalImage from "react-modal-image";

/* TODO: tietokone- (md) ja mobiilinäyttö (xs) */
/* <Col xs={4} md={4}></Col> */

//TODO: kuvien varjostus! https://getbootstrap.com/docs/4.1/utilities/shadows/

function AllImages({ imageInfo }) {
  return (
    <div id="all-images" style={{ paddingTop: "100px" }}>
      <h1 className="all-titles">Tuotanto:</h1>
      {imageInfo.map((i, index) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <div>
              <Row>
                <Col xs={8} md={8}>
                  {/* TODO: mb-5 tuo alapuolelle vällystä, tarvitaanko sitä? */}
                  <button className="shadow-lg p-1  first-column-style">
                    {/* <img
                      className="image-style"
                      alt="kuva, muuta tämä!"
                      // width="500"
                      // TODO: seuraava rivi ei toimi responsiivisesti oikein!
                      height="300vw"
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    <ModalImage
                      className="image-style"
                      small={"http://localhost:8080/images/" + i.image}
                      medium={"http://localhost:8080/images/" + i.image}
                      alt={`${i.name}, ${i.year}`}
                      hideDownload="true"
                    />
                  </button>
                </Col>
                <Col>
                  {index % 4 === 0 ? <div className="splash1"></div> : ""}
                </Col>
              </Row>
              <Row>
                <Col>
                  {(index + 1) % 4 === 0 ? <div className="splash1"></div> : ""}
                </Col>
                <Col
                  xs={4}
                  md={4}
                  className="shadow-lg p-3  second-column-style"
                >
                  <div className="tables-info-style">
                    <h5>{i.name}</h5>
                    <h6>{i.year}</h6>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col xs={4} md={4}>
                  {index % 3 === 0 ? <div className="splash1"></div> : ""}
                </Col>
                <Col>
                  {/* TODO: mb-5 tuo alapuolelle vällystä, tarvitaanko sitä? */}
                  <button className="shadow-lg p-1  first-column-style2">
                    {/* <img
                      key={index}
                      className="image-style"
                      alt={i.text}
                      // width="500"
                      // height="350vw"
                      height="400vw"
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    <ModalImage
                      className="image-style"
                      small={"http://localhost:8080/images/" + i.image}
                      medium={"http://localhost:8080/images/" + i.image}
                      alt={`${i.name}, ${i.year}`}
                      hideDownload="true"
                    />
                  </button>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={4}
                  md={4}
                  className="shadow-lg p-3  second-column-style2"
                >
                  <div className="tables-info-style">
                    <h5>{i.name}</h5>
                    <h6>{i.year}</h6>
                  </div>
                </Col>
                <Col>
                  {(index + 1) % 3 === 0 ? <div className="splash1"></div> : ""}
                </Col>
              </Row>
            </div>
          )}
        </div>
      ))}
      {/* TODO: kaikki kuvat */}
      {/* {imageInfo.map((i, index) => (
            <img
              key={index}
              className="image-style"
              alt="kuva, muuta tämä!"
              // width="500"
              height="100"
              src={"http://localhost:8080/images/" + i.image}
            />
          ))} */}
    </div>
  );
}

export default AllImages;
