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
      dispatch(rightAdminUser(result));
    });

    dispatch(loggingValidatedTrue());
  };

  return (
    <div>
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
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Salasana:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Group>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
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
