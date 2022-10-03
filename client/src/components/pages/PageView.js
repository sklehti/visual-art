import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import WelcomePage from "./WelcomePage";
import Showroom from "./showroom/Showroom";
import ShowroomIcon from "../icons/ShowroomButton";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import ArrowUp from "../images/arrow-up.svg";
import Footer from "./Footer";
import ArrowUp from "../icons/ArrowUp";

function PageView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      //TODO: seuraava rivi vaihtaa korkeutta
      // translateY: 50,
      scale: anime.stagger([0.7, 1], { from: "center" }),
      delay: anime.stagger(100, { start: 600 }),
      // translateX: [-10, 30],
    });
  }, []);

  const handleButton = () => {
    window.scrollTo(0, 0);
    console.log("make same actions here..");
  };

  return (
    <div id="top">
      <Navbar id="navbar" className="color-nav" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <div className="flex-container">
              <button className="showroom-button" onClick={handleButton}>
                <ShowroomIcon />
              </button>
              {titleArraw.map((l, index) => (
                <h1 key={index} className="letter">
                  {l}
                </h1>
              ))}
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#test_1">test-1</Nav.Link>
              <Nav.Link href="#test_2">test-2</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Showroom />
      <WelcomePage />
      {/* <a href="#top">
        <img alt="arrow-up" src={ArrowUp} className="arrow-up-style" />
      </a> */}
      <a href="#top">
        <ArrowUp />
      </a>
      <Footer />
    </div>
  );
}

export default PageView;
