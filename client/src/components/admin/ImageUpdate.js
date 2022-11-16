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

function ImageUpdate() {
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
      text: i.text,
      image: i.image,
    };

    dispatch(imgData(img));
    dispatch(showModalTrue());
  };

  return (
    <div>
      <h2>Poista tai päivitä kuvan tiedot:</h2>
      {imageInfo.map((i, index) => (
        <button key={index} onClick={() => handleShow(i)}>
          <img
            alt="kuva, muuta tämä!"
            // width="500"
            height="300"
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
            alt="kuva, muuta tämä!"
            // width="500"
            height="80"
            src={"http://localhost:8080/images/" + imageData.image}
          />
          <Modal.Title> {imageData.image}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageForm imageData={imageData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Kirjoita otsikko"),
  text: Yup.string().required("Kirjoita kuvailutulkkaus"),
});

const ImageForm = ({ imageData }) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const updatedImage = {
      image: imageData.image,
      name: values.name,
      text: values.text,
    };

    visualArtDatabase.updateImageInfo(updatedImage).then((result) => {
      let tempArray = [];
      visualArtDatabase.getAllInfo().then((results) => {
        results.forEach((n) => {
          tempArray = [...tempArray, n];

          visualArtDatabase.getImages(n.image);
        });
        dispatch(allImages(tempArray));
        dispatch(showModalFalse());
      });
    });
  };

  const handleDeleteImage = (values) => {
    visualArtDatabase.deleteImage(values.image).then((result) => {
      console.log(result, "result");
    });
  };

  return (
    <div>
      <Formik
        initialValues={{ name: imageData.name, text: imageData.text }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleFormSubmit(values);
          resetForm({ values: "" });
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
                // placeholder={imageData.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Form.Group>
            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Kuvailuteksti:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // placeholder={imageData.text}
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
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Päivitä
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="secondary"
                type="submit"
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
