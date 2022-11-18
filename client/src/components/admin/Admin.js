import React from "react";
import ImageUpload from "./ImageUpload";
import Container from "react-bootstrap/Container";
import AdminLogging from "./AdminLogging";
import AdminRegister from "./AdminRegister";

import { useSelector } from "react-redux";
import ImageUpdate from "./ImageUpdate";

function Admin() {
  const rightUser = useSelector((state) => state.admin);

  //TODO: make this form thinner if you like so: https://react-bootstrap.netlify.app/layout/grid/#container
  return (
    <div style={{ backgroundColor: "#F0F3F3" }}>
      <Container>
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
      </Container>
    </div>
  );
}

export default Admin;
