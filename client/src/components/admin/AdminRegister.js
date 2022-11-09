import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import visualArtDatabase from "../../services/visualArtDatabase";

// Huom! usaStatet muutetaan Formikiksi (lomake)! esim. https://react-bootstrap.github.io/forms/validation/
function AdminRegister() {
  const [validated, setValidated] = useState(false);
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const form = useRef();

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const user = {
      username: userName,
      password: userPassword,
      admin: true,
    };

    visualArtDatabase.createAdmin(user).then((result) => {
      console.log(result, "result");
    });
    event.preventDefault();
    setValidated(true);
  };

  return (
    <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Sähköpostiosoite:</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          onChange={handleUserName}
        />
        <Form.Control.Feedback type="invalid">
          Kirjoita salasana.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Salasana:</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          onChange={handleUserPassword}
        />
        <Form.Control.Feedback type="invalid">
          kirjoita salasana.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Kirjaudu
      </Button>
    </Form>
  );
}

export default AdminRegister;