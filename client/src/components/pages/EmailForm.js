import React from "react";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Epävalidi sähköpostiosoite")
    .required("Kirjoita sähköpostiosoiteesi"),
  title: Yup.string().required("Kirjoita otsikko."),
  text: Yup.string().required("Kirjoita viesti."),
});

function EmailForm() {
  const handleFormSubmit = (event) => {
    emailjs.init(process.env.REACT_APP_USER_ID);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        //event.target
        "#email-form"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", title: "", text: "" }}
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
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
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Lähetä
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmailForm;
