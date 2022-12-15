import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalImage from "react-modal-image";

function ImageView({ array1, array2, array3 }) {
  return (
    <Row>
      <Col xs={1} md={1}></Col>
      <Col xs={3} md={3}>
        {array1.map((i, index) =>
          index % 2 === 0 || index === 0 ? (
            <div key={index}>
              <div style={{ float: "right", minHeight: "30vw" }}>
                <button
                  className="shadow-lg p-1  first-column-style2"
                  title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
                >
                  <ModalImage
                    className="image-style1"
                    small={"http://localhost:8080/images/" + i.image}
                    medium={"http://localhost:8080/images/" + i.image}
                    alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                    hideDownload="true"
                  />
                </button>

                <div> {`${i.name}, ${i.year}`}</div>
              </div>
            </div>
          ) : (
            <div key={index} style={{ float: "left", minHeight: "30vw" }}>
              <button
                className="shadow-lg p-1  first-column-style"
                title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
              >
                <ModalImage
                  className="image-style1"
                  small={"http://localhost:8080/images/" + i.image}
                  medium={"http://localhost:8080/images/" + i.image}
                  alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                  hideDownload="true"
                />
              </button>
              <div> {`${i.name}, ${i.year}`}</div>
            </div>
          )
        )}
      </Col>
      <Col xs={1} md={1}></Col>
      <Col xs={3} md={3}>
        {array2.map((i, index) =>
          index % 2 === 0 || index === 0 ? (
            <div key={index} style={{ float: "left", minHeight: "30vw" }}>
              <button
                className="shadow-lg p-1  first-column-style"
                title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
              >
                <ModalImage
                  className="image-style2"
                  small={"http://localhost:8080/images/" + i.image}
                  medium={"http://localhost:8080/images/" + i.image}
                  alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                  hideDownload="true"
                />
              </button>
              <div> {`${i.name}, ${i.year}`}</div>
            </div>
          ) : (
            <div key={index} style={{ float: "right", minHeight: "30vw" }}>
              <button
                className="shadow-lg p-1  first-column-style2"
                title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
              >
                <ModalImage
                  className="image-style2"
                  small={"http://localhost:8080/images/" + i.image}
                  medium={"http://localhost:8080/images/" + i.image}
                  alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                  hideDownload="true"
                />
              </button>
              <div> {`${i.name}, ${i.year}`}</div>
            </div>
          )
        )}
      </Col>
      <Col xs={3} md={3}>
        {array3.map((i, index) =>
          index % 2 === 0 || index === 0 ? (
            <div key={index} style={{ float: "right", minHeight: "30vw" }}>
              <button
                className="shadow-lg p-1  first-column-style2"
                title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
              >
                <ModalImage
                  className="image-style3"
                  small={"http://localhost:8080/images/" + i.image}
                  medium={"http://localhost:8080/images/" + i.image}
                  alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                  hideDownload="true"
                />
              </button>
              <div> {`${i.name}, ${i.year}`}</div>
            </div>
          ) : (
            <div key={index} style={{ float: "left", minHeight: "30vw" }}>
              <button
                className="shadow-lg p-1  first-column-style"
                title={`Taulun nimi ${i.name}, vuosi ${i.year}`}
              >
                <ModalImage
                  className="image-style3"
                  small={"http://localhost:8080/images/" + i.image}
                  medium={"http://localhost:8080/images/" + i.image}
                  alt={`Nimi: ${i.name} | vuosi: ${i.year} | korkeus: ${i.height} | leveys: ${i.width}`}
                  hideDownload="true"
                />
              </button>
              <div> {`${i.name}, ${i.year}`}</div>
            </div>
          )
        )}
      </Col>
      <Col xs={1} md={1}></Col>
    </Row>
  );
}

export default ImageView;
