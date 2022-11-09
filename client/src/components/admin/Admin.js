import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Container from "react-bootstrap/Container";
import AdminLogging from "./AdminLogging";

import { useSelector } from "react-redux";

function Admin() {
  // const [rightUser, setRightUser] = useState({
  //   status: false,
  // });

  const rightUser = useSelector((state) => state.admin);

  //TODO: kavenna lomaketta: https://react-bootstrap.netlify.app/layout/grid/#container
  return (
    <Container>
      {rightUser.status ? (
        <div>
          <br />
          <ImageUpload rightUser={rightUser} />
          <br />
        </div>
      ) : (
        <div>
          {/* TODO: poista lopullisestaversiosta! */}
          {/* <br />
          <h1>Rekisteröityminen</h1>
          <br />
          <AdminRegister /> */}

          <br />
          <h1>Kirjautuminen</h1>
          <br />
          {/* <AdminLogging setRightUser={setRightUser} /> */}
          <AdminLogging rightUser={rightUser} />
        </div>
      )}
    </Container>
  );
}

export default Admin;
