import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import Dropdown from "react-bootstrap/Dropdown";

function AdminNavbar() {
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
                  to={"/adminDashboard/dashboard"}
                >
                  Dashboard
                </Nav.Link>

                {/* Branches dropdown */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    Manage Branches
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* View */}
                    <Dropdown.Item as={Link} to={"/adminDashboard/viewBranch"}>
                      View Branches
                    </Dropdown.Item>
                    {/* Add */}
                    <Dropdown.Item as={Link} to={"/adminDashboard/addBranch"}>
                      Add Branches
                    </Dropdown.Item>
                    {/* Edit */}
                   
                  </Dropdown.Menu>
                </Dropdown>
                {/* Employee dropdown */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    Manage Employee
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* View */}
                    <Dropdown.Item
                      as={Link}
                      to={"/adminDashboard/viewEmployee"}
                    >
                      View Employee
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* Products dropdown */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    Manage Products
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* View */}
                    <Dropdown.Item
                      as={Link}
                      to={"/adminDashboard/viewProducts"}
                    >
                      View Products
                    </Dropdown.Item>
                    {/* Add */}
                    <Dropdown.Item as={Link} to={"/adminDashboard/addProducts"}>
                      Add Products
                    </Dropdown.Item>
                    {/* Deleted */}
                    <Dropdown.Item
                      as={Link}
                      to={"/adminDashboard/deletedProducts"}
                    >
                      Deleted Products
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* Users dropdown */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    Manage Users
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* View */}
                    <Dropdown.Item as={Link} to={"/adminDashboard/viewUsers"}>
                      View Users
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link
                  className="nav-link"
                  as={Link}
                  to={"/adminDashboard/feedback"}
                >
                  Feedback Reports
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

      {/* Logout modal */}
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

export default AdminNavbar;
