import React, { useEffect } from "react";
import visualArtDatabase from "../../services/visualArtDatabase";
import { useDispatch, useSelector } from "react-redux";
import { allImages } from "../../reducers/pageViewReducer";
import {
  showModalFalse,
  showModalTrue,
} from "../../reducers/imageUpdateReducer";
import { imgData } from "../../reducers/imageUpdate2Reducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicAlert from "../alerts/BasicAlert";
import FormAlert from "../alerts/FormAlerts";

function ImageUpdate({ rightUser }) {
  const dispatch = useDispatch();
  const imageInfo = useSelector((state) => state.pageView);
  const imgAdded = useSelector((state) => state.imageUpdate);
  const imageData = useSelector((state) => state.imageUpdate2);

  useEffect(() => {
    let tempArray = [];

    visualArtDatabase.getAllInfo().then((results) => {
      results.forEach((n) => {
        tempArray = [...tempArray, n];

        visualArtDatabase.getImages(n.image);
      });
      dispatch(allImages(tempArray));
    });
  }, [dispatch, imgAdded.imgAdded]);

  const handleClose = () => {
    dispatch(showModalFalse());
  };
  const handleShow = (i) => {
    const img = {
      name: i.name,
      year: i.year,
      height: i.height,
      width: i.width,
      text: i.text,
      image: i.image,
    };

    dispatch(imgData(img));
    dispatch(showModalTrue());
  };

  return (
    <div>
      <br />
      <h2>Poista tai päivitä kuvan tiedot:</h2>
      <br />
      {imageInfo.map((i, index) => (
        <button
          key={index}
          onClick={() => handleShow(i)}
          className="button-style shadow-lg"
        >
          <img
            className="img-height"
            alt="kuva, muuta tämä!"
            src={"http://localhost:8080/images/" + i.image}
          />
          <p> {i.name}</p>
        </button>
      ))}

      <Modal
        show={imgAdded.modalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <img
            style={{ paddingRight: "10px" }}
            alt={imageData.name}
            height="80"
            src={"http://localhost:8080/images/" + imageData.image}
          />
          <Modal.Title> {imageData.image}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageForm imageData={imageData} rightUser={rightUser} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Kirjoita otsikko"),
  year: Yup.string()
    .min(4, "Liian lyhyt!")
    .max(4, "Liian pitkä!")
    .matches(
      /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
      "tulee sisältää vain lukuja!"
    )
    .required("Kirjoita vuosiluku"),
  height: Yup.string()
    .matches(
      /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
      "tulee sisältää vain lukuja!"
    )
    .required("Kirjoita taulun korkeus"),
  width: Yup.string()
    .matches(
      /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
      "tulee sisältää vain lukuja!"
    )
    .required("Kirjoita taulun leveys"),
  text: Yup.string().required("Kirjoita kuvailutulkkaus"),
});

const ImageForm = ({ imageData, rightUser }) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const updatedImage = {
      image: imageData.image,
      name: values.name,
      year: values.year,
      height: values.height,
      width: values.width,
      text: values.text,
    };

    visualArtDatabase.validateToken(rightUser.token).then((results) => {
      if (results.success === 1) {
        FormAlert("Haluatko päivittää taulun tiedot?", "Kyllä", "En").then(
          (result) => {
            if (result.isConfirmed) {
              visualArtDatabase.updateImageInfo(updatedImage).then((result) => {
                dispatch(showModalFalse());
                let tempArray = [];
                visualArtDatabase.getAllInfo().then((results) => {
                  results.forEach((n) => {
                    tempArray = [...tempArray, n];

                    visualArtDatabase.getImages(n.image);
                  });
                  dispatch(allImages(tempArray));
                });
              });
            } else if (result.isDenied) {
              dispatch(showModalFalse());
              BasicAlert("info", "Taulun tietoja ei päivitetty");
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
  };

  const handleDeleteImage = (values) => {
    visualArtDatabase.validateToken(rightUser.token).then((results) => {
      if (results.success === 1) {
        FormAlert(
          "Haluatko poistaa taulun ja sen tiedot lopullisesti?",
          "Kyllä",
          "En"
        ).then((result) => {
          if (result.isConfirmed) {
            BasicAlert("success", "Taulun tiedot poistettu!");
            dispatch(showModalFalse());
            visualArtDatabase.deleteImage(values.image).then((result) => {
              let tempArray = [];

              visualArtDatabase.getAllInfo().then((results) => {
                results.forEach((n) => {
                  tempArray = [...tempArray, n];

                  visualArtDatabase.getImages(n.image);
                });
                dispatch(allImages(tempArray));
              });
            });
          } else if (result.isDenied) {
            BasicAlert("info", "Taulun tietoja ei poistettu");
            dispatch(showModalFalse());
          }
        });
      }
      if (results.success === 0) {
        BasicAlert(
          "error",
          "Kirjautumistietosi ovat vanhentuneet. Päivitä selain ja kirjaudu uudestaan."
        );
      }
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: imageData.name,
          year: imageData.year,
          height: imageData.height,
          width: imageData.width,
          text: imageData.text,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleFormSubmit(values);
          resetForm({ values: values });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail3">
              <Form.Label>Otsikko:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Form.Group>

            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
            <Form.Group className="mb-3" controlId="formYear3">
              <Form.Label>Vuosi:</Form.Label>
              <Form.Control
                type="text"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
              />
            </Form.Group>
            {errors.year && touched.year ? (
              <div className="error-message">{errors.year}</div>
            ) : null}
            <Form.Group className="mb-3" controlId="formHeight3">
              <Form.Label>korkeus:</Form.Label>
              <Form.Control
                type="text"
                name="height"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height}
              />
            </Form.Group>
            {errors.height && touched.height ? (
              <div className="error-message">{errors.height}</div>
            ) : null}
            <Form.Group className="mb-3" controlId="formWidth3">
              <Form.Label>Leveys:</Form.Label>
              <Form.Control
                type="text"
                name="width"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.width}
              />
            </Form.Group>
            {errors.width && touched.width ? (
              <div className="error-message">{errors.width}</div>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Kuvailuteksti:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
              />
            </Form.Group>
            {errors.text && touched.text ? (
              <div className="error-message">{errors.text}</div>
            ) : null}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                id="formButton"
                type="submit"
                disabled={isSubmitting}
                style={{ fontWeight: "bold" }}
              >
                Päivitä
              </Button>
              <Button
                style={{ marginLeft: "10px", fontWeight: "bold" }}
                id="formButton2"
                variant="secondary"
                type="button"
                onClick={() => handleDeleteImage(imageData)}
              >
                Poista
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImageUpdate;
