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
    dispatch(firstTimeOnPage(false));
    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleAlphabetZ = () => {
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

    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleYearRising = () => {
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

    dispatch(imgArray1(array1));
    dispatch(imgArray2(array2));
    dispatch(imgArray3(array3));
  };

  const handleYearDescending = () => {
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

export default AllImages;
