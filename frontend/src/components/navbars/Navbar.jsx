import React from 'react';
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
 

function CustomNavbar() {

  
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
            <div className="flex-grow-1 d-flex justify-content-center">
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
            </div>
            <div className="btn-container">
              <Link to="/login">
                <Button className="cus-login-btn">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="cus-reg-btn">
                  <i className="fa-solid fa-person-circle-plus"></i> Register
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar