import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { viewBranchesForCustoerAPI } from "../../services/customerService";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import BACKEND_URL from "../../services/uploadsBaseUrl";

function CustomerProducts() {
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

  const [customer, setCustomer] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

useEffect(() => {
  const getCustomerProfile = async () => {
    try {
      const response = await getProfile();

      setCustomer(response.data);

      const userCity = (response.data.city || "").trim().toLowerCase();

      const matchedCity = cities.find((c) => c.toLowerCase() === userCity);

      setSelectedCity(matchedCity || "");
    } catch (err) {
      console.log(err);
    }
  };

  getCustomerProfile();
}, []);

  useEffect(() => {
    const viewBranchesForCustomer = async () => {
      try {
        const response = await viewBranchesForCustoerAPI();
        setBranches(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
        alert("Failed to load branches");
      } finally {
        setLoading(false);
      }
    };

    viewBranchesForCustomer();
  }, []);

  const filteredBranches = branches.filter(
    (b) =>
      (b.branchCity || "").toLowerCase() === (selectedCity || "").toLowerCase(),
  );

 

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
      <Container fluid className="mt-4 px-4">
        {/* Header */}
        <h3 className="fw-bold mb-4">Explore Branches</h3>

        {/* City Filter */}
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <FloatingLabel label="Select City">
              <Form.Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">--Select City--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Empty State */}
        {filteredBranches.length === 0 ? (
          <div className="text-center mt-5">
            <h5>No branches found in this city</h5>
            <p>Try selecting another location</p>
          </div>
        ) : (
          <Row>
            {filteredBranches.map((branch) => (
              <Col
                key={branch._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <Card className="h-100 shadow-sm border-0 rounded-4 card-hover">
                  {/* Image */}
                  <Card.Img
                    variant="top"
                    src={
                      branch.branchImage
                        ? `${BACKEND_URL}/${branch.branchImage}`
                        : "/src/assets/images/defaultImage.png"
                    }
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">
                      {branch.branchName}
                    </Card.Title>

                    <Card.Text className="text-muted small">
                      <i className="fa-solid fa-location-dot me-2"></i>
                      {branch.branchArea}, {branch.branchCity}
                    </Card.Text>

                    <Card.Text className="text-muted small">
                      <i className="fa-solid fa-phone me-2"></i>
                      {branch.branchPhone}
                    </Card.Text>

                    <div className="mt-auto">
                      <Button
                        variant="dark"
                        className="w-100 rounded-pill"
                        onClick={() =>
                          navigate(
                            `/customerDashboard/customerViewProduct/${branch._id}`,
                          )
                        }
                      >
                        View Products →
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Hover Effect Style */}
        <style>
          {`
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          }
        `}
        </style>
      </Container>
    </>
  );
}

export default CustomerProducts;
