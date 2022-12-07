import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import visualArtDatabase from "../../../services/visualArtDatabase";
import ImageView from "./ImageView";
import { useDispatch, useSelector } from "react-redux";
import { imgByYear } from "../../../reducers/allImages1Reducer";
import { imgArray1 } from "../../../reducers/allImages2Reducer";
import { imgArray2 } from "../../../reducers/allImages3Reducer";
import { imgArray3 } from "../../../reducers/allImages4Reducer";
import { firstTimeOnPage } from "../../../reducers/allImages5Reducer";
import MobileImageView from "./MobileImageView";

function AllImages({ imageInfo }) {
  const dispatch = useDispatch();
  const imagesByYear = useSelector((state) => state.allImages1);
  const imageArray1 = useSelector((state) => state.allImages2);
  const imageArray2 = useSelector((state) => state.allImages3);
  const imageArray3 = useSelector((state) => state.allImages4);
  const firstTime = useSelector((state) => state.allImages5);

  const ref = useRef(null);
  // TODO: muuta seuraava reduxiksi
  const [mobileView, setMobileView] = useState(0);

  useLayoutEffect(() => {
    setMobileView(ref.current.offsetWidth);
  }, [setMobileView, mobileView]);

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
      // setImageByYear(tmpArr);
      dispatch(imgByYear(tmpArr));
    });
  }, [dispatch]);

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
    // setFirstTime(false);
    // setImageArray1(array1);
    // setImageArray2(array2);
    // setImageArray3(array3);

    dispatch(firstTimeOnPage(false));
    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleAlphabetZ = () => {
    // setFirstTime(false);
    dispatch(firstTimeOnPage(false));

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
    // setImageArray1(array1);
    // setImageArray2(array2);
    // setImageArray3(array3);

    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleYearRising = () => {
    // setFirstTime(false);
    dispatch(firstTimeOnPage(false));

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
    // setImageArray1(array1);
    // setImageArray2(array2);
    // setImageArray3(array3);

    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleYearDescending = () => {
    // setFirstTime(false);
    dispatch(firstTimeOnPage(false));

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
    // setImageArray1(array1);
    // setImageArray2(array2);
    // setImageArray3(array3);

    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  return (
    <div ref={ref} id="all-images" style={{ paddingTop: "100px" }}>
      <h2 className="all-titles">Tuotanto:</h2>
      {mobileView >= 550 ? (
        <div>
          <Row>
            <DropdownButton
              id="dropdown-item-button"
              title="Hakujärjestys"
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

          {firstTime ? (
            <ImageView array1={array1} array2={array2} array3={array3} />
          ) : (
            <ImageView
              array1={imageArray1}
              array2={imageArray2}
              array3={imageArray3}
            />
          )}
        </div>
      ) : (
        <div>
          {firstTime ? (
            <MobileImageView
              imageInfo={imageInfo}
              imagesByYear={imagesByYear}
            />
          ) : (
            <MobileImageView
              imageInfo={imageInfo}
              imagesByYear={imagesByYear}
            />
          )}
        </div>
      )}
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
