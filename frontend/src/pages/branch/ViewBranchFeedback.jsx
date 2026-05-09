import React, { useEffect, useState } from "react";
import { Container, Card, Badge, Row, Col } from "react-bootstrap";
import { getBranchFeedbackAPI } from "../../services/feedbackService";

function ViewBranchFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getBranchFeedbackAPI();
        setFeedbacks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="mb-0">Customer Feedback</h3>
        <small className="text-muted">Reviews given by customers</small>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-5">
          <h5>No Feedback Available</h5>
          <p className="text-muted">
            Feedback from customers will appear here.
          </p>
        </div>
      ) : (
        <Row className="g-3">
          {feedbacks.map((fb) => (
            <Col md={6} lg={4} key={fb._id}>
              <Card className="shadow-sm border-0 rounded-4 h-100">
                <Card.Body className="d-flex flex-column">
                  {/* Rating */}
                  <div className="mb-2">
                    <Badge bg="warning" text="dark">
                      ⭐ {fb.rating}/5
                    </Badge>
                  </div>

                  {/* Comment */}
                  <p className="mb-3">{fb.comment}</p>

                  {/* Employee */}
                  {fb.employee && (
                    <div className="mb-2 small text-muted">
                      <strong>Employee:</strong> {fb.employee.employeeName}
                    </div>
                  )}

                  {/* User Info */}
                  <div className="mt-auto">
                    <div className="fw-semibold">{fb.name}</div>
                    <div className="text-muted small">{fb.email}</div>

                    <div className="text-muted small mt-1">
                      {new Date(fb.createdAt).toLocaleString()}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ViewBranchFeedback;
