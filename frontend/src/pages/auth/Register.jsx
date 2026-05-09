import React from "react";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import API from "../../services/api";
import GeneralNavbar from "../../components/navbars/GeneralNavbar";
import GeneralFooter from "../../components/footers/GeneralFooter";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../common/LocationPicker";

function Register() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      city: form.city.value,
      address: form.address.value,
      pincode: form.pincode.value,
      customerLat: form.customerLat.value,
      customerLng: form.customerLng.value,
    };
    try {
      const response = await API.post("/auth/register", data);
      console.log("the data is sent");
      console.log(response.data);

      form.reset();

      alert("Registration successful. Please Login");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("Already registered email");
        console.log(
          "Response message from backend",
          err.response?.data?.message,
        );
        alert("Already existing eamil");
      }
      console.log("Registration error", err);
    }
  };

  // This function receives data from child
  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };

  return (
    <>
      <GeneralNavbar />

      <section className="hero-section d-flex align-items-center justify-content-center min-vh-100 text-white p-3">
        {/* Background bubbles */}
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>

        <div
          className="glass-effect p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold">Create Account</h3>
            <p className="text-muted small">Join OceanFresh today</p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* PERSONAL INFO */}
            <h6 className="fw-semibold mb-3">Personal Details</h6>

            <Row className="g-3">
              <Col md={6}>
                <FloatingLabel label="Full Name">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Phone Number">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={12}>
                <FloatingLabel label="Email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={12}>
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* ADDRESS */}
            <h6 className="fw-semibold mb-3">Address Details</h6>

            <Row className="g-3">
              <Col md={6}>
                <Form.Select name="city" className="py-3">
                  <option value="">Select City</option>
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>Madurai</option>
                  <option>Salem</option>
                  <option>Trichy</option>
                  <option>Erode</option>
                  <option>Tirunelveli</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <FloatingLabel label="Pincode">
                  <Form.Control
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                  />
                </FloatingLabel>
              </Col>

              <Col md={12}>
                <FloatingLabel label="Address">
                  <Form.Control as="textarea" rows={3} name="address" />
                </FloatingLabel>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* LOCATION */}
            <h6 className="fw-semibold mb-3">Location</h6>

            <Row className="g-3">
              <Col md={6}>
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </Col>

              <Col md={6}>
                <FloatingLabel label="Latitude">
                  <Form.Control
                    type="text"
                    name="customerLat"
                    readOnly
                    value={location ? location.lat : ""}
                  />
                </FloatingLabel>

                <FloatingLabel label="Longitude" className="mt-3">
                  <Form.Control
                    type="text"
                    name="customerLng"
                    readOnly
                    value={location ? location.lng : ""}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            {/* BUTTON */}
            <button className="btn reg-form-btn w-100 mt-4 fw-bold">
              Create Account
            </button>
          </Form>
        </div>
      </section>

      <GeneralFooter />
    </>
  );
}

export default Register;
