import React from "react";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormAlert from "../alerts/FormAlerts";
import BasicAlert from "../alerts/BasicAlert";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Epävalidi sähköpostiosoite")
    .required("Kirjoita sähköpostiosoiteesi"),
  title: Yup.string().required("Kirjoita otsikko."),
  text: Yup.string().required("Kirjoita viesti."),
});

function EmailForm() {
  const handleFormSubmit = (resetForm) => {
    FormAlert("Haluatko lähettää viestin?", "Lähetä", "Älä lähetä").then(
      (result) => {
        if (result.isConfirmed) {
          BasicAlert("success", "Viesti lähetetty!");

          emailjs.init(process.env.REACT_APP_USER_ID);

          emailjs
            .sendForm(
              process.env.REACT_APP_SERVICE_ID,
              process.env.REACT_APP_TEMPLATE_ID,
              "#email-form"
            )
            .then(
              function (response) {
                resetForm({ values: "" });
              },
              function (err) {
                console.log("FAILED...", err);
              }
            );
        } else if (result.isDenied) {
          BasicAlert("info", "Viestiä ei lähetetty");
        }
      }
    );
  };

  return (
    <div
      id="send-email"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <h2 className="all-titles">Yhteydenotto:</h2>

      <Row>
        <Col xs={1} md={2}></Col>
        <Col className="emailform-style shadow-lg">
          <Formik
            initialValues={{ email: "", title: "", text: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleFormSubmit(resetForm);
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
              <Form id="email-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sähköpostiosoite:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nimi@sähköposti.com"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Form.Group>
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Otsikko:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Otsikko"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </Form.Group>
                {errors.title && touched.title ? (
                  <div className="error-message">{errors.title}</div>
                ) : null}
                <Form.Group className="mb-3" controlId="formBasicTextArea">
                  <Form.Label>Viesti:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Kirjoita tekstiä..."
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
                <Button
                  variant="primary"
                  id="formButton"
                  type="submit"
                  disabled={isSubmitting}
                  alt="paina painiketta lähettääksesi lomake"
                  style={{ fontWeight: "bold" }}
                >
                  Lähetä
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col xs={1} md={2}></Col>
      </Row>
    </div>
  );
}

export default EmailForm;
