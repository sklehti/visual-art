import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalImage from "react-modal-image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import visualArtDatabase from "../../services/visualArtDatabase";

function AllImages({ imageInfo }) {
  const [imagesByYear, setImageByYear] = useState([]);
  const [imageArray1, setImageArray1] = useState([]);
  const [imageArray2, setImageArray2] = useState([]);
  const [imageArray3, setImageArray3] = useState([]);
  const [firstTime, setFirstTime] = useState(true);

  //TODO: Täällä paljon toistoa, paranna koodia!
  let tempArray = [];
  let array1 = [];
  let array2 = [];
  let array3 = [];

  useEffect(() => {
    let tmpArr = [];

    visualArtDatabase.getAllInfoByYear().then((results) => {
      results.forEach((n) => {
        tmpArr = [...tmpArr, n];

        visualArtDatabase.getImages(n.image);
      });
      setImageByYear(tmpArr);
    });
  }, [setImageByYear]);

  imageInfo.map((i, index) => {
    index % 3 === 0 || index === 0
      ? (array1 = [...array1, i])
      : (tempArray = [...tempArray, i]);

    return null;
  });

  tempArray.map((i, index) => {
    index % 2 === 0 ? (array2 = [...array2, i]) : (array3 = [...array3, i]);

    return null;
  });

  const handleAlphabetA = () => {
    setFirstTime(false);

    setImageArray1(array1);
    setImageArray2(array2);
    setImageArray3(array3);
  };

  const handleAlphabetZ = () => {
    setFirstTime(false);

    const arr = [];
    tempArray = [];
    array1 = [];
    array2 = [];
    array3 = [];
    imageInfo.map((i, index) => {
      arr.unshift(i);

      return null;
    });

    arr.map((i, index) => {
      index % 3 === 0 || index === 0
        ? (array1 = [...array1, i])
        : (tempArray = [...tempArray, i]);

      return null;
    });
    tempArray.map((i, index) => {
      index % 2 === 0 ? (array2 = [...array2, i]) : (array3 = [...array3, i]);

      return null;
    });
    setImageArray1(array1);
    setImageArray2(array2);
    setImageArray3(array3);
  };

  const handleYearRising = () => {
    setFirstTime(false);

    tempArray = [];
    array1 = [];
    array2 = [];
    array3 = [];

    imagesByYear.map((i, index) => {
      index % 3 === 0 || index === 0
        ? (array1 = [...array1, i])
        : (tempArray = [...tempArray, i]);

      return null;
    });
    tempArray.map((i, index) => {
      index % 2 === 0 ? (array2 = [...array2, i]) : (array3 = [...array3, i]);

      return null;
    });
    setImageArray1(array1);
    setImageArray2(array2);
    setImageArray3(array3);
  };

  const handleYearDescending = () => {
    setFirstTime(false);

    const arr = [];
    tempArray = [];
    array1 = [];
    array2 = [];
    array3 = [];
    imagesByYear.map((i, index) => {
      arr.unshift(i);

      return null;
    });

    arr.map((i, index) => {
      index % 3 === 0 || index === 0
        ? (array1 = [...array1, i])
        : (tempArray = [...tempArray, i]);

      return null;
    });
    tempArray.map((i, index) => {
      index % 2 === 0 ? (array2 = [...array2, i]) : (array3 = [...array3, i]);

      return null;
    });
    setImageArray1(array1);
    setImageArray2(array2);
    setImageArray3(array3);
  };

  return (
    <div id="all-images" style={{ paddingTop: "100px" }}>
      <h1 className="all-titles">Tuotanto:</h1>

      <Row>
        <DropdownButton
          id="dropdown-item-button"
          title="Muuta hakujärjestystä"
          className="dropdown-list-style"
        >
          <Dropdown.Item as="button" onClick={handleAlphabetA}>
            Aakkosjärjestys a-ö
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleAlphabetZ}>
            Aakkosjärjestys ö-a
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleYearRising}>
            Vuosilukujärjestys nouseva
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleYearDescending}>
            Vuosilukujärjestys laskeva
          </Dropdown.Item>
        </DropdownButton>
      </Row>

      <div>
        {firstTime ? (
          <Row>
            <Col xs={3} md={3}>
              {array1.map((i, index) =>
                index % 2 === 0 || index === 0 ? (
                  <div key={index}>
                    <div style={{ float: "right", minHeight: "23vw" }}>
                      <button className="shadow-lg p-1  first-column-style2">
                        <ModalImage
                          className="image-style1"
                          small={"http://localhost:8080/images/" + i.image}
                          medium={"http://localhost:8080/images/" + i.image}
                          alt={`${i.name}, ${i.year}`}
                          hideDownload="true"
                        />
                      </button>

                      <div> {`${i.name}, ${i.year}`}</div>
                    </div>
                  </div>
                ) : (
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style1"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
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
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style2"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                ) : (
                  <div
                    key={index}
                    style={{ float: "right", minHeight: "23vw" }}
                  >
                    <button className="shadow-lg p-1  first-column-style2">
                      <ModalImage
                        className="image-style2"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
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
                  <div
                    key={index}
                    style={{ float: "right", minHeight: "23vw" }}
                  >
                    <button className="shadow-lg p-1  first-column-style2">
                      <ModalImage
                        className="image-style3"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                ) : (
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style3"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style3"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                )
              )}
            </Col>
            <Col xs={2} md={2}></Col>
          </Row>
        ) : (
          <Row>
            <Col xs={3} md={3}>
              {imageArray1.map((i, index) =>
                index % 2 === 0 || index === 0 ? (
                  <div key={index}>
                    <div style={{ float: "right", minHeight: "23vw" }}>
                      <button className="shadow-lg p-1  first-column-style2">
                        <ModalImage
                          className="image-style1"
                          small={"http://localhost:8080/images/" + i.image}
                          medium={"http://localhost:8080/images/" + i.image}
                          alt={`${i.name}, ${i.year}`}
                          hideDownload="true"
                        />
                        {/* <img
                        className="image-style1"
                        alt={i.text}
                        src={"http://localhost:8080/images/" + i.image}
                      /> */}
                      </button>

                      <div> {`${i.name}, ${i.year}`}</div>
                    </div>
                  </div>
                ) : (
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style1"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style1"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                )
              )}
            </Col>

            <Col xs={1} md={1}></Col>

            <Col xs={3} md={3}>
              {imageArray2.map((i, index) =>
                index % 2 === 0 || index === 0 ? (
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style2"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style2"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                ) : (
                  <div
                    key={index}
                    style={{ float: "right", minHeight: "23vw" }}
                  >
                    <button className="shadow-lg p-1  first-column-style2">
                      <ModalImage
                        className="image-style2"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style2"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                )
              )}
            </Col>

            <Col xs={3} md={3}>
              {imageArray3.map((i, index) =>
                index % 2 === 0 || index === 0 ? (
                  <div
                    key={index}
                    style={{ float: "right", minHeight: "23vw" }}
                  >
                    <button className="shadow-lg p-1  first-column-style2">
                      <ModalImage
                        className="image-style3"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style3"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                ) : (
                  <div key={index} style={{ float: "left", minHeight: "23vw" }}>
                    <button className="shadow-lg p-1  first-column-style">
                      <ModalImage
                        className="image-style3"
                        small={"http://localhost:8080/images/" + i.image}
                        medium={"http://localhost:8080/images/" + i.image}
                        alt={`${i.name}, ${i.year}`}
                        hideDownload="true"
                      />
                      {/* <img
                      className="image-style3"
                      alt={i.text}
                      src={"http://localhost:8080/images/" + i.image}
                    /> */}
                    </button>
                    <div> {`${i.name}, ${i.year}`}</div>
                  </div>
                )
              )}
            </Col>
            <Col xs={2} md={2}></Col>
          </Row>
        )}
      </div>
    </div>
  );
}

// TODO: 1. SEURAAVASSA KOODISSA TAULUT OVAT YHDESSÄ RIVISSÄ
// function AllImages({ imageInfo }) {
//   return (
//     <div id="all-images" style={{ paddingTop: "100px" }}>
//       <h1 className="all-titles">Tuotanto:</h1>
//       {imageInfo.map((i, index) => (
//         <div key={index}>
//           {index % 2 === 0 ? (
//             <div>
//               <Row>
//                 <Col xs={8} md={8}>
//                   {/* TODO: mb-5 tuo alapuolelle vällystä, tarvitaanko sitä? */}
//                   <button className="shadow-lg p-1 first-column-style">
//                     {/* <img
//                       className="image-style"
//                       alt="kuva, muuta tämä!"
//                       // width="500"
//                       // TODO: seuraava rivi ei toimi responsiivisesti oikein!
//                       height="300vw"
//                       src={"http://localhost:8080/images/" + i.image}
//                     /> */}
//                     <ModalImage
//                       className="image-style"
//                       small={"http://localhost:8080/images/" + i.image}
//                       medium={"http://localhost:8080/images/" + i.image}
//                       alt={`${i.name}, ${i.year}`}
//                       hideDownload="true"
//                     />
//                   </button>
//                 </Col>
//                 <Col>
//                   {index % 4 === 0 ? <div className="splash1"></div> : ""}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   {(index + 1) % 4 === 0 ? <div className="splash1"></div> : ""}
//                 </Col>
//                 <Col
//                   xs={4}
//                   md={4}
//                   className="shadow-lg p-3  second-column-style"
//                 >
//                   <div className="tables-info-style">
//                     <h5>{i.name}</h5>
//                     <h6>{i.year}</h6>
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           ) : (
//             <div>
//               <Row>
//                 <Col xs={4} md={4}>
//                   {index % 3 === 0 ? <div className="splash1"></div> : ""}
//                 </Col>
//                 <Col>
//                   {/* TODO: mb-5 tuo alapuolelle vällystä, tarvitaanko sitä? */}
//                   <button className="shadow-lg p-1  first-column-style2">
//                     {/* <img
//                       key={index}
//                       className="image-style"
//                       alt={i.text}
//                       // width="500"
//                       // height="350vw"
//                       height="400vw"
//                       src={"http://localhost:8080/images/" + i.image}
//                     /> */}
//                     <ModalImage
//                       className="image-style"
//                       small={"http://localhost:8080/images/" + i.image}
//                       medium={"http://localhost:8080/images/" + i.image}
//                       alt={`${i.name}, ${i.year}`}
//                       hideDownload="true"
//                     />
//                   </button>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col
//                   xs={4}
//                   md={4}
//                   className="shadow-lg p-3  second-column-style2"
//                 >
//                   <div className="tables-info-style">
//                     <h5>{i.name}</h5>
//                     <h6>{i.year}</h6>
//                   </div>
//                 </Col>
//                 <Col>
//                   {(index + 1) % 3 === 0 ? <div className="splash1"></div> : ""}
//                 </Col>
//               </Row>
//             </div>
//           )}
//         </div>
//       ))}
//       {/* TODO: kaikki kuvat */}
//       {/* {imageInfo.map((i, index) => (
//             <img
//               key={index}
//               className="image-style"
//               alt="kuva, muuta tämä!"
//               // width="500"
//               height="100"
//               src={"http://localhost:8080/images/" + i.image}
//             />
//           ))} */}
//     </div>
//   );
// }

export default AllImages;
