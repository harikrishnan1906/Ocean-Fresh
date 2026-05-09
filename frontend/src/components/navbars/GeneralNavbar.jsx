import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function GeneralNavbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="navbar-container">
          <Navbar.Brand className="title" href="#">
            <i className="fa-solid fa-fish-fins"></i>
            OceanFresh
            <p className="caption">Fresh from Ocean to Your Doors</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <div className="flex-grow-1 d-flex justify-content-center">
              <Nav className="justify-content-center cus-nav-links-container">
                <Nav.Link className="nav-link" href="#home">
                  Home
                </Nav.Link>
                <Nav.Link className="nav-link" href="#branches">
                  Branches
                </Nav.Link>
                <Nav.Link className="nav-link" href="#products">
                  Products
                </Nav.Link>
                <Nav.Link className="nav-link" href="#products">
                  QR Feedback
                </Nav.Link>
              </Nav>
            </div> */}
            <div className="btn-container flex-grow-1 d-flex justify-content-end">
              <Link to="/">
                <Button className="cus-reg-btn">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>Home Page
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default GeneralNavbar