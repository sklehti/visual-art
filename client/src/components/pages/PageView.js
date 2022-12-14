import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Showroom from "./showroom/Showroom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./Footer";
import ArrowUp from "../icons/ArrowUp";
import visualArtDatabase from "../../services/visualArtDatabase";
import EmailForm from "./EmailForm";

import { useDispatch, useSelector } from "react-redux";
import { allImages } from "../../reducers/pageViewReducer";
import AllImages from "./allImages/AllImages";
import ArtistInfo from "./ArtistInfo";

function PageView() {
  const dispatch = useDispatch();
  const imageInfo = useSelector((state) => state.pageView);

  useEffect(() => {
    visualArtDatabase.getAllInfo().then((results) => {
      dispatch(allImages(results));
    });
  }, [dispatch]);

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-400px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  const titleArraw = [
    "K",
    "a",
    "u",
    "k",
    "o",
    "L",
    "e",
    "h",
    "t",
    "i",
    "n",
    "e",
    "n",
  ];

  useEffect(() => {
    anime({
      targets: ".letter",
      opacity: 1,
      scale: anime.stagger([0.8, 1], { from: "center" }),
      delay: anime.stagger(100, { start: 600 }),
    });
  }, []);

  return (
    <div>
      <Navbar id="navbar" className="color-nav" expand="lg" fixed="top">
        <Container>
          <Navbar.Text href="#home">
            <div className="flex-container" title="Kauko Lehtinen">
              <div className="showroom-icon" alt="">
                <a
                  href="#top"
                  className="arrow-style"
                  title="Siirry sivun alkuun"
                  alt="Painamalla painiketta siirryt sivun alkuun"
                >
                  <ArrowUp />
                </a>
              </div>
              {titleArraw.map((l, index) => (
                <h1 key={index} className="letter">
                  {l}
                </h1>
              ))}
            </div>
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto nav-title-style"
              style={{ maxHeight: "120px" }}
              navbarScroll
            >
              <Nav.Link className="titles-color" href="#top">
                N??yttelytila
              </Nav.Link>
              <Nav.Link className="titles-color" href="#all-images">
                Tuotanto
              </Nav.Link>
              <Nav.Link className="titles-color" href="#artist-information">
                Tietoa taiteilijasta
              </Nav.Link>
              <Nav.Link className="titles-color" href="#send-email">
                Yhteydenottolomake
              </Nav.Link>
              <Nav.Link className="titles-color" href="#footer-id">
                Yhteystiedot
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        fluid
        style={{ textAlign: "center" }}
        className="background-image-style"
      >
        <Row>
          <Col>
            <Showroom />
            <AllImages imageInfo={imageInfo} />
            <ArtistInfo />
            <EmailForm />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default PageView;
