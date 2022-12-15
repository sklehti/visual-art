import React, { useState, useRef } from "react";
import visualArtDatabase from "../../services/visualArtDatabase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { invaledImageUpload } from "../../reducers/imageUploadReducer";
import { addImageTrue, addImageFalse } from "../../reducers/imageUpdateReducer";
import BasicAlert from "../alerts/BasicAlert";
import FormAlert from "../alerts/FormAlerts";

// TODO: Formik does not support files uploading (at least a few years ago), so I did not use Formik in this file.
// However, it is possible to do this with Formik.
function ImageUpload({ rightUser }) {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [validated, setValidated] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [imageText, setImageText] = useState("");
  const [imageYear, setImageYear] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");

  const dispatch = useDispatch();
  const invalidImage = useSelector((state) => state.imageUpload);
  const isSuccess = useSelector((state) => state.imageUpload2);

  const form = useRef();

  const handleImageTitle = (e) => {
    setImageTitle(e.target.value);
  };

  const handleImageYear = (e) => {
    const y = e.target.value.replace(/\D/g, "");

    setImageYear(y);
  };

  const handleImageHeight = (e) => {
    const y = e.target.value.replace(/\D/g, "");

    setImageHeight(y);
  };

  const handleImageWidth = (e) => {
    const y = e.target.value.replace(/\D/g, "");

    setImageWidth(y);
  };

  const handleImageText = (e) => {
    setImageText(e.target.value);
  };

  const handleInputChange = (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
      dispatch(invaledImageUpload("Valitse validi kuva muotoa: JPG,JPEG,PNG"));

      return false;
    }
    if (imageFile.size >= 1000000) {
      dispatch(invaledImageUpload("Valitse pienempi kuva (pienempi kuin 1MB)"));

      return false;
    }
    dispatch(invaledImageUpload(""));
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

    dispatch(addImageFalse());
  };

  const submit = async () => {
    if (
      userInfo.filepreview !== null &&
      imageTitle.length > 0 &&
      imageText.length > 0 &&
      imageYear > 0 &&
      imageHeight.length > 0 &&
      imageWidth.length > 0
    ) {
      visualArtDatabase.validateToken(rightUser.token).then((results) => {
        if (results.success === 1) {
          FormAlert("Haluatko tallentaa taulun tiedot?", "Kyllä", "En").then(
            (result) => {
              if (result.isConfirmed) {
                const formdata = new FormData();
                formdata.append("avatar", userInfo.file);
                formdata.append("name", imageTitle);
                formdata.append("text", imageText);
                formdata.append("year", imageYear);
                formdata.append("height", imageHeight);
                formdata.append("width", imageWidth);

                visualArtDatabase
                  .createTableInfo(formdata, {
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                  .then((res) => {
                    if (res.success === 1) {
                      BasicAlert("success", "Taulun tiedot tallennettu!");

                      setuserInfo({
                        file: [],
                        filepreview: null,
                      });
                      setImageTitle("");
                      setImageText("");
                      setImageYear("");
                      setImageHeight("");
                      setImageWidth("");
                      setValidated(false);

                      dispatch(addImageTrue());
                    }
                  });
              } else if (result.isDenied) {
                BasicAlert("info", "Taulun tietoja ei tallennettu");
              }
            }
          );
        }
        if (results.success === 0) {
          BasicAlert(
            "error",
            "Kirjautumistietosi ovat vanhentuneet. Päivitä selain ja kirjaudu uudestaan."
          );
        }
      });
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
  };

  return (
    <div>
      <br />
      <h2>Lisää uusi kuva:</h2>
      <br />
      <div className="form-style shadow-lg">
        <Form
          ref={form}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {isSuccess !== null ? <h4> {isSuccess} </h4> : null}

          <Form.Group className="mb-3">
            <Form.Label>Valitse kuva:</Form.Label>
            <Form.Control
              required
              type="file"
              className="form-control"
              name="upload_file"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Valitse kuva.
            </Form.Control.Feedback>
          </Form.Group>
          {invalidImage !== null ? (
            <div className="error-message"> {invalidImage} </div>
          ) : null}
          <Form.Group className="mb-3" controlId="controlInput1">
            <Form.Label> Taulun otsikko:</Form.Label>
            <Form.Control
              required
              type="text"
              name="Title"
              placeholder="Otsikko"
              value={imageTitle}
              onChange={handleImageTitle}
            />
            <Form.Control.Feedback type="invalid">
              Kirjoita otsikko.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="controlInput2">
            <Form.Label> Taulun vuosiluku:</Form.Label>
            <Form.Control
              required
              type="text"
              name="year"
              placeholder="Vuosi"
              value={imageYear}
              onChange={handleImageYear}
            />
            <Form.Control.Feedback type="invalid">
              Kirjoita vuosiluku.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="controlInput2">
            <Form.Label> Taulun korkeus:</Form.Label>
            <Form.Control
              required
              type="text"
              name="height"
              placeholder="Korkeus"
              value={imageHeight}
              onChange={handleImageHeight}
            />
            <Form.Control.Feedback type="invalid">
              Kirjoita taulun korkeus.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="controlInput2">
            <Form.Label> Taulun leveys:</Form.Label>
            <Form.Control
              required
              type="text"
              name="width"
              placeholder="Leveys"
              value={imageWidth}
              onChange={handleImageWidth}
            />
            <Form.Control.Feedback type="invalid">
              Kirjoita taulun leveys.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="ontrolTextarea1">
            <Form.Label> Taulun teksti:</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Tekstiä tähän..."
              row={3}
              value={imageText}
              onChange={handleImageText}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Kirjoita kuvaava teksti taulusta.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            id="formButton"
            type="submit"
            onClick={() => submit()}
          >
            Lähetä
          </Button>
        </Form>
      </div>
      <br />
      {userInfo.filepreview !== null ? (
        <img
          id="test_kuva"
          className="previewimg"
          src={userInfo.filepreview}
          alt="UploadImage"
          style={{ width: "20vw" }}
        />
      ) : null}
    </div>
  );
}
export default ImageUpload;
