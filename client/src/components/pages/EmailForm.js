import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EmailForm() {
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const form = useRef();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const user = {
      email: email,
      title: title,
      text: text,
    };

    emailjs.init(process.env.REACT_APP_USER_ID);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        event.target
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );

    event.preventDefault();
    setValidated(true);
    setEmail("");
    setTitle("");
    setText("");
  };

  return (
    <Form
      ref={form}
      id="email-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Sähköpostiosoite</Form.Label>
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="nimi@sähköposti.com"
          onChange={handleEmail}
        />
        <Form.Control.Feedback type="invalid">
          Kirjoita validi sähköposti.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Otsikko</Form.Label>
        <Form.Control
          required
          name="title"
          type="text"
          placeholder="otsikko"
          onChange={handleTitle}
        />
        <Form.Control.Feedback type="invalid">
          Kirjoita otsikko.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Viesti</Form.Label>
        <Form.Control
          required
          name="text"
          as="textarea"
          rows={3}
          placeholder="Tekstiä..."
          onChange={handleText}
        />
        <Form.Control.Feedback type="invalid">
          Kirjoita viesti.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Lähetä</Button>
    </Form>
  );
}

export default EmailForm;
