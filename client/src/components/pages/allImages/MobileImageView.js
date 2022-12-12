import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { imgArray1 } from "../../../reducers/allImages2Reducer";

function MobileImageView({ imageInfo, imagesByYear }) {
  const dispatch = useDispatch();
  const imageArray = useSelector((state) => state.allImages2);

  useEffect(() => {
    dispatch(imgArray1(imageInfo));
  }, [dispatch, imageInfo]);

  const handleAlphabetA = () => {
    dispatch(imgArray1(imageInfo));
  };

  const handleAlphabetZ = () => {
    let arr = [];

    imageInfo.map((i, index) => {
      arr.unshift(i);

      return null;
    });
    dispatch(imgArray1(arr));
  };

  const handleYearRising = () => {
    dispatch(imgArray1(imagesByYear));
  };

  const handleYearDescending = () => {
    let arr = [];

    imagesByYear.map((i, index) => {
      arr.unshift(i);

      return null;
    });
    dispatch(imgArray1(arr));
  };

  return (
    <div>
      <Row>
        <DropdownButton
          id="dropdown-item-button"
          title="Hakujärjestystä"
          style={{ marginBottom: "30px" }}
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
      {imageArray.map((i, index) => (
        <div key={index}>
          <button className="shadow-lg p-1  mobile-column-style">
            <ModalImage
              className="mobile-image-style"
              small={"http://localhost:8080/images/" + i.image}
              medium={"http://localhost:8080/images/" + i.image}
              alt={`${i.name}, ${i.year}`}
              hideDownload="true"
            />
          </button>
          <div> {`${i.name}, ${i.year}`}</div>
        </div>
      ))}
    </div>
  );
}

export default MobileImageView;
