import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

function CustomerNavbar() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      logout();
      setShow(false);
      navigate("/");
      console.log(response.message);
    } catch (err) {
      console.log("logout error", err);
    }
  };
  const handleShow = () => setShow(true);
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
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/customerDashboard/customerProfile"}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/customerDashboard/customerProducts"}
                >
                  Products
                </Nav.Link>
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/customerDashboard/customerFavorite"}
                >
                  Favorite
                </Nav.Link>
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/customerDashboard/customerMyOrders"}
                >
                  My Orders
                </Nav.Link>
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/customerDashboard/customerReports"}
                >
                  Report
                </Nav.Link>
              </Nav>
            </div>
            <div className="btn-container">
              <Button className="cus-reg-btn" onClick={handleShow}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>You'r about to logout from this page...!</Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerNavbar;
