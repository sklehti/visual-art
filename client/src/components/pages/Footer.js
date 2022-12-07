import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      id="footer-id"
      bgColor="none"
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: "#f8f8ff" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Sosiaalinen media:</span>
        </div>

        <div>
          {/* TODO: tarvitaanko alt teksteijä? */}
          <a href="https://fi-fi.facebook.com/" className="me-4 text-reset">
            <MDBIcon fab icon="facebook" />
          </a>
          <a
            href="https://www.google.com/search?q=kauko+lehtinen&oq=kauko+lehtinen&aqs=chrome.0.35i39i355j46i39j0i512l2j0i22i30j69i60l3.2739j0j7&sourceid=chrome&ie=UTF-8"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="google" />
          </a>
          <a href="https://www.instagram.com/" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Sivuston toteutus
              </h6>
              <p>Tulossa myöhemmin</p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Hyödyllisiä linkkejä
              </h6>
              <p>
                <a
                  href="https://fi.wikipedia.org/wiki/Kauko_Lehtinen"
                  className="text-reset"
                >
                  Wikipedia
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Yhteystiedot</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Tulossa myöhemmin
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" />
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright: Saara Lehtinen
      </div>
    </MDBFooter>
  );
}

export default Footer;
