import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import visualArtDatabase from "../../services/visualArtDatabase";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicAlert from "../alerts/BasicAlert";

const SignupSchema = Yup.object().shape({
  // TODO: vaihda seuraava rivi kommenttiriviin!!!
  password: Yup.string().required("Kirjoita salasanasi"),
  // password: Yup.string()
  //   .required("Kirjoita salasanasi")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Tulee sisältää vähintään 8 merkkiä, yksi isokirjain, yksi pieni kirjain, yksi numero ja yksi erikoismerkki"
  //   ),
  email: Yup.string()
    .email("Epävalidi sähköpostiosoite")
    .required("Kirjoita sähköpostiosoiteesi"),
});

function AdminRegister() {
  const handleFormSubmit = (values) => {
    const user = {
      username: values.email,
      password: values.password,
      admin: false,
    };

    visualArtDatabase.createAdmin(user).then((result) => {
      BasicAlert(
        "",
        "Kiitos rekisteröitymisestä. Tarvitset vielä käyttöoikeudet ylläpitäjältä."
      );
    });
  };

  return (
    <div className="form-style shadow-lg" style={{ marginBottom: "200px" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
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
            <Form.Group className="mb-3" controlId="formEmail4">
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
            <Form.Group className="mb-3" controlId="formPassword4">
              <Form.Label>Salasana:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Salasana"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Group>
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}
            <br />
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Rekisteröidy
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminRegister;
