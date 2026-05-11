import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetailsForFeedbackAPI } from "../../services/customerService";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  FloatingLabel,
  Button,
  Alert,
} from "react-bootstrap";
import { submitQRFeedbackAPI } from "../../services/feedbackService";
import GeneralFooter from "../../components/footers/GeneralFooter";
import GeneralNavbar from "../../components/navbars/GeneralNavbar";
import BACKEND_URL from "../../services/uploadsBaseUrl";
import defaultImage from "../../assets/images/defaultImage.png";

function StarRating({ rating, setRating }) {
  return (
    <div className="d-flex justify-content-center gap-2 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "1.6rem",
            cursor: "pointer",
            color: star <= rating ? "#ffc107" : "#ddd",
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CustomerQRCodeFeedback() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const employeeId = queryParams.get("employeeId");
  const branchId = queryParams.get("branchId");

  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [branchDetail, setBranchDetails] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDetailsForFeedback = async () => {
      try {
        const response = await getDetailsForFeedbackAPI(branchId, employeeId);
        setBranchDetails(response.branch);
        setEmployeeDetail(response.employee);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsForFeedback();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitFeedback = async (e) => {
    try {
      e.preventDefault();

      if (
        !formData.name ||
        !formData.email ||
        !formData.comment ||
        !formData.rating
      ) {
        setMessage("Please fill all fields");
        return;
      }

      const response = await submitQRFeedbackAPI({
        ...formData,
        employee: employeeDetail._id,
        branch: branchDetail._id,
        feedbackType: "QR",
      });

      console.log(response);

      setMessage("Feedback submitted successfully!");

      setFormData({
        name: "",
        email: "",
        rating: 0,
        comment: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <GeneralNavbar />

      <div>
        <div>
          <section className="hero-section d-flex align-items-center justify-content-center min-vh-100 text-white p-4">
            {/* floating bubbles */}
            <div className="bubble bubble1"></div>
            <div className="bubble bubble2"></div>
            <div className="bubble bubble3"></div>

            <div className="glass-effect" style={{ minWidth: "1000px" }}>
              <Container className="py-4">
                <Row className="justify-content-center g-4">
                  <Col xs={12} lg={5} className="d-flex justify-content-center">
                    {(branchDetail || employeeDetail) && (
                      <Card className="w-100 shadow-sm border-0 rounded-4 text-center">
                        {branchDetail && (
                          <Card.Img
                            variant="top"
                            style={{ height: "200px", objectFit: "cover" }}
                            src={
                              branchDetail.branchImage
                                ? `BACKEND_URL/${branchDetail.branchImage}`
                                : defaultImage
                            }
                          />
                        )}

                        <Card.Body>
                          {/* Branch */}
                          {branchDetail && (
                            <>
                              <h5 className="fw-bold mb-2">
                                {branchDetail.branchName}
                              </h5>
                              <p className="mb-1">
                                <b>{branchDetail.branchCity}</b>
                              </p>
                              <p className="mb-1 text-muted">
                                {branchDetail.branchArea}
                              </p>
                              <p className="mb-1 text-muted">
                                {branchDetail.branchPhone}
                              </p>
                              <p className="small text-muted">
                                {branchDetail.branchAddress}
                              </p>
                              <hr />
                            </>
                          )}

                          {/* Employee */}
                          {employeeDetail && (
                            <div className="mt-3">
                              <div className="d-flex justify-content-center mb-2">
                                <img
                                  src={
                                    employeeDetail.employeeImage
                                      ? `${BACKEND_URL}/${employeeDetail.employeeImage}`
                                      : defaultImage
                                  }
                                  alt="employee"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <h6 className="fw-semibold mb-0">
                                {employeeDetail.employeeName}
                              </h6>
                              <p className="text-muted small">Employee</p>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    )}
                  </Col>

                  <Col xs={12} lg={7} className="d-flex justify-content-center">
                    <Card className="w-100 shadow border-0 rounded-4">
                      <Card.Body className="p-4">
                        <h4 className="text-center mb-4">Give Your Feedback</h4>

                        {message && <Alert variant="info">{message}</Alert>}

                        <Form onSubmit={handleSubmitFeedback}>
                          <FloatingLabel label="Name" className="mb-3">
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </FloatingLabel>

                          <FloatingLabel label="Email" className="mb-3">
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </FloatingLabel>

                          <Form.Group className="mb-3 text-center">
                            <Form.Label>Rating</Form.Label>
                            <StarRating
                              rating={formData.rating}
                              setRating={(val) =>
                                setFormData({ ...formData, rating: val })
                              }
                            />
                          </Form.Group>

                          <FloatingLabel
                            label="Write your feedback"
                            className="mb-4"
                          >
                            <Form.Control
                              as="textarea"
                              style={{ height: "120px" }}
                              name="comment"
                              value={formData.comment}
                              onChange={handleChange}
                            />
                          </FloatingLabel>

                          <div className="d-grid">
                            <Button variant="primary" size="lg" type="submit">
                              Submit Feedback
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        </div>
      </div>

      <GeneralFooter />
    </>
  );
}

export default CustomerQRCodeFeedback;
