import React, { useEffect, useState } from "react";
import { getBranchDetailsAPI } from "../../services/branchService";
import { Container, Row, Col, Card, Spinner, Table } from "react-bootstrap";

function BranchDashboard() {
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBranchDetails = async () => {
      try {
        const response = await getBranchDetailsAPI();
        setBranch(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
        alert("Failed to load the branch details")
      } finally {
        setLoading(false);
      }
    };
    getBranchDetails();
  }, []);

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
    <Container fluid className="py-4 px-4">
      {!branch ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow border-0 rounded-4 overflow-hidden">
              {/* Image */}
              <div style={{ height: "250px", overflow: "hidden" }}>
                <img
                  src={
                    branch.branchImage
                      ? `http://localhost:5069/${branch.branchImage}`
                      : "/src/assets/images/defaultImage.png"
                  }
                  alt="branch"
                  className="w-100"
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>

              <Card.Body>
                {/* Title */}
                <h3 className="fw-bold text-center mb-4">
                  {branch.branchName}
                </h3>

                <Row className="g-3">
                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Branch Code</small>
                      <h6>{branch.branchCode}</h6>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Phone</small>
                      <h6>{branch.branchPhone}</h6>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Email</small>
                      <h6>{branch.email}</h6>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">City</small>
                      <h6>{branch.branchCity}</h6>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Area</small>
                      <h6>{branch.branchArea}</h6>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Pincode</small>
                      <h6>{branch.branchPincode}</h6>
                    </div>
                  </Col>

                  <Col xs={12}>
                    <div className="p-3 bg-light rounded-3">
                      <small className="text-muted">Address</small>
                      <h6>{branch.branchAddress}</h6>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BranchDashboard;
