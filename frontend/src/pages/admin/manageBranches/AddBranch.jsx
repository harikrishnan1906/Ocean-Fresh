import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
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
  Badge,
  Table,
} from "react-bootstrap";
import LocationPicker from "../../common/LocationPicker";
import { useState } from "react";
import defaultImage from "../../../assets/images/defaultImage.png";

function AddBranch() {
  const [location, setLocation] = useState(null);
  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
    "Sivakasi",
    "Karur",
    "Nagercoil",
    "Kanchipuram",
    "Karaikudi",
  ];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("branchName", form.branchName.value);
    formData.append("branchPhone", form.branchPhone.value);
    formData.append("branchAddress", form.branchAddress.value);
    formData.append("branchPincode", form.branchPincode.value);
    formData.append("branchCity", form.branchCity.value);
    formData.append("branchArea", form.branchArea.value);
    formData.append("email", form.branchEmail.value);
    formData.append("password", form.branchPassword.value);
    formData.append("branchLat", location?.lat || "");
    formData.append("branchLng", location?.lng || "");

    formData.append("branchImage", form.branchImage.files[0]);

    try {
      const response = await API.post("/branch/register", formData);
      console.log("the new branch data is sent to the backend");
      console.log(response.data);
      form.reset();
      alert(response.data.message);
      window.location.reload();
    } catch (err) {
      console.log("error in branch creation", err);
    }
  };

  // This function receives data from child
  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Add New Branch</h2>
        <p className="text-muted">Create and manage branch details</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="shadow-sm rounded-4 p-4 bg-white">
            <Form onSubmit={handleSubmit}>
              {/* IMAGE PREVIEW */}
              <div className="text-center mb-4">
                <img
                  id="previewImg"
                  src={defaultImage}
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <div className="small text-muted mt-2">
                  Branch Image Preview
                </div>
              </div>

              {/* IMAGE INPUT */}
              <FloatingLabel label="Upload Branch Image" className="mb-3">
                <Form.Control
                  type="file"
                  name="branchImage"
                  required
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        document.getElementById("previewImg").src =
                          reader.result;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FloatingLabel>

              {/* BASIC INFO */}
              <Row>
                <Col md={6}>
                  <FloatingLabel label="Branch Name" className="mb-3">
                    <Form.Control name="branchName" required />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Phone Number" className="mb-3">
                    <Form.Control name="branchPhone" required />
                  </FloatingLabel>
                </Col>
              </Row>

              <FloatingLabel label="Address" className="mb-3">
                <Form.Control name="branchAddress" required />
              </FloatingLabel>

              {/* LOCATION */}
              <Row>
                <Col md={4}>
                  <FloatingLabel label="City" className="mb-3">
                    <Form.Select name="branchCity" required>
                      <option value="">Select City</option>
                      {cities.map((city, i) => (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel label="Area" className="mb-3">
                    <Form.Control name="branchArea" required />
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel label="Pincode" className="mb-3">
                    <Form.Control name="branchPincode" required />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* LOGIN INFO */}
              <Row>
                <Col md={6}>
                  <FloatingLabel label="Branch Email" className="mb-3">
                    <Form.Control type="email" name="branchEmail" required />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      name="branchPassword"
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* MAP + LAT LNG */}
              <Row className="mb-3">
                <Col md={6}>
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Latitude" className="mb-3">
                    <Form.Control value={location?.lat || ""} readOnly />
                  </FloatingLabel>

                  <FloatingLabel label="Longitude" className="mb-3">
                    <Form.Control value={location?.lng || ""} readOnly />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* BUTTONS */}
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/adminDashboard/viewBranch")}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="primary">
                  Create Branch
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBranch;
