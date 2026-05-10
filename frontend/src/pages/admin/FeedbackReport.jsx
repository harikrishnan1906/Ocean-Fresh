import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { getAllFeedbackAPI } from "../../services/adminService";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getAllFeedbackAPI();
        setFeedbacks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeedback();
  }, []);

  // 🔍 Filter
  const filteredFeedback = feedbacks.filter((fb) =>
    (fb.comment || "").toLowerCase().includes(search.toLowerCase()),
  );

  // ⭐ Rating color (optional UX improvement)
  const getRatingColor = (rating) => {
    if (rating >= 4) return "success";
    if (rating === 3) return "warning";
    return "danger";
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h3 className="mb-0">Feedback</h3>
          <small className="text-muted">Customer reviews & ratings</small>
        </div>

        {/* Search */}
        <Form.Control
          type="text"
          placeholder="Search feedback..."
          style={{ maxWidth: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Feedback Cards */}
      <Row className="g-3">
        {filteredFeedback.map((fb) => (
          <Col md={6} lg={4} key={fb._id}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body className="d-flex flex-column">
                {/* Rating */}
                <Badge bg={getRatingColor(fb.rating)} className="mb-2">
                  ⭐ {fb.rating}/5
                </Badge>

                {/* Comment */}
                <p className="mb-2">{fb.comment}</p>

                {/* Employee */}
                {fb.employee && (
                  <small className="text-muted">
                    Employee Name: {fb.employee.employeeName}
                  </small>
                )}

                {/* Branch */}
                {fb.branch && (
                  <small className="text-muted">
                    Branch: {fb.branch.branchName}
                  </small>
                )}

                {/* Footer */}
                <div className="mt-auto small text-muted mt-2">
                  {fb.name} • {new Date(fb.createdAt).toLocaleString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredFeedback.length === 0 && (
        <div className="text-center mt-5">
          <h5>No Feedback Found</h5>
        </div>
      )}
    </Container>
  );
}

export default Feedback;
