import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import visualArtDatabase from "../../services/visualArtDatabase";
import { rightAdminUser } from "../../reducers/adminReducer";
import { loggingValidatedTrue } from "../../reducers/loggingValidateReducer";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

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

function AdminLogging() {
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const user = {
      username: values.email,
      password: values.password,
    };

    visualArtDatabase.getAdmin(user).then((result) => {
      if (result.success === 0) {
        console.log(
          "Käyttäjätunnus/salasana on väärä tai sinulla ei ole admin oikeuksia"
        );
      } else {
        dispatch(rightAdminUser(result));
      }
    });

    dispatch(loggingValidatedTrue());
  };

  return (
    <div className="form-style  shadow-lg">
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
            <Form.Group className="mb-3" controlId="formEmail2">
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
            <Form.Group className="mb-3" controlId="formPassword2">
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
              Kirjaudu
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminLogging;
