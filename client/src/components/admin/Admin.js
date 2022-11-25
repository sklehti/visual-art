import React from "react";
import ImageUpload from "./ImageUpload";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLogging from "./AdminLogging";
import AdminRegister from "./AdminRegister";

import { useSelector } from "react-redux";
import ImageUpdate from "./ImageUpdate";

function Admin() {
  const rightUser = useSelector((state) => state.admin);

  return (
    <div style={{ backgroundColor: "#F0F3F3", textAlign: "center" }}>
      <Container>
        <Row>
          <Col xs={1} md={2}></Col>
          <Col>
            {rightUser.status ? (
              <div>
                <br />
                <ImageUpload rightUser={rightUser} />
                <br />

                <ImageUpdate rightUser={rightUser} />
                <br />
              </div>
            ) : (
              <div>
                <br />
                <h1>Kirjautuminen</h1>
                <br />

                <AdminLogging rightUser={rightUser} />
                <br />
                <h1>Rekisteröityminen</h1>
                <br />

                <AdminRegister />
                <br />
              </div>
            )}
          </Col>
          <Col xs={1} md={2}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;
