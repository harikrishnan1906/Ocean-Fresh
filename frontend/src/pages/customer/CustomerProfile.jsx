import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { getProfile } from "../../services/authService";
import { editCustomerProfile } from "../../services/customerService";

function CustomerProfile() {
  // customre edit modal
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const getCustomerProfile = async () => {
      try {
        const response = await getProfile();
        setCustomer(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    getCustomerProfile();
  }, []);

  const handleEditCustomerProfile = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      city: form.city.value,
      address: form.address.value,
      pincode: form.pincode.value,
    };

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      setSaving(true);
      const response = await editCustomerProfile(customer?._id, data);

      setCustomer(response.data);
      console.log(response);
      setModalShow(false);
      alert("Profile updated successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {customer ? (
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="p-4 shadow rounded bg-white text-dark">
                {/* Profile Image */}
                <div className="text-center mb-4">
                  <Image
                    src="/src/assets/images/defaultImage.png"
                    roundedCircle
                    width={120}
                    height={120}
                    className="border"
                  />
                  <h3 className="mt-3">{customer.name}</h3>
                  <p className="text-muted mb-0">
                    {customer.type?.toUpperCase()}
                  </p>
                </div>

                {/* Details */}
                <Row className="mb-3">
                  <Col xs={5} className="fw-bold">
                    Email
                  </Col>
                  <Col xs={7}>{customer.email}</Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={5} className="fw-bold">
                    Phone
                  </Col>
                  <Col xs={7}>{customer.phone}</Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={5} className="fw-bold">
                    Address
                  </Col>
                  <Col xs={7}>{customer.address}</Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={5} className="fw-bold">
                    City
                  </Col>
                  <Col xs={7}>{customer.city}</Col>
                </Row>

                <Row>
                  <Col xs={5} className="fw-bold">
                    Pincode
                  </Col>
                  <Col xs={7}>{customer.pincode}</Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="text-end">
            <Button
              variant="light"
              onClick={() => {
                setModalShow(true);
              }}
            >
              <i className="fa-solid fa-user-pen"></i> Edit
            </Button>
          </div>
        </Container>
      ) : (
        <div className="text-center py-5">
          <h5>Loading User Details...</h5>
        </div>
      )}

      {/* customer details edit  modal */}

      <div>
        <Modal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form onSubmit={handleEditCustomerProfile}>
                {/* customer name */}
                <FloatingLabel
                  controlId="name"
                  label="Full Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="fullname"
                    name="name"
                    defaultValue={customer?.name}
                  />
                </FloatingLabel>

                {/* customer email */}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    defaultValue={customer?.email}
                  />
                </FloatingLabel>

                {/* customer phone */}
                <FloatingLabel
                  controlId="phone"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="phone"
                    name="phone"
                    defaultValue={customer?.phone}
                  />
                </FloatingLabel>

                {/* customer city */}
                <Form.Select
                  name="city"
                  defaultValue={customer?.city}
                  size="lg"
                  className="fw-lighter mb-3"
                >
                  <option value="City">--Select City--</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Dindigul">Dindigul</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Erode">Erode</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Thoothukudi">Thoothukudi</option>
                  <option value="Thanjavur">Thanjavur</option>
                  <option value="Kanyakumari">Kanyakumari</option>
                </Form.Select>

                {/* customer address */}

                <FloatingLabel
                  controlId="address"
                  label="address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Address"
                    name="address"
                    defaultValue={customer?.address}
                  />
                </FloatingLabel>

                {/* customer pincode */}

                <FloatingLabel
                  controlId="pincode"
                  label="pincode"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    defaultValue={customer?.pincode}
                  />
                </FloatingLabel>

                <div className="text-end ">
                  <Button
                    className="me-3"
                    variant="secondary"
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="success" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default CustomerProfile;
