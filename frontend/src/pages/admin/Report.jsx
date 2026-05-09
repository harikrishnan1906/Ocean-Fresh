import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { getAllReportsAPI } from "../../services/adminService";

function Report() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getAllReportsAPI();
        setReports(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReports();
  }, []);

  // 🔍 Filter by title/category
  const filteredReports = reports.filter(
    (r) =>
      r.reportTitle.toLowerCase().includes(filter.toLowerCase()) ||
      r.reportCategory.toLowerCase().includes(filter.toLowerCase()),
  );

  // 🎨 Priority color
  const getPriorityColor = (priority) => {
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    return "secondary";
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h3 className="mb-0">Reports</h3>
          <small className="text-muted">Customer issues & complaints</small>
        </div>

        {/* Search */}
        <Form.Control
          type="text"
          placeholder="Search reports..."
          style={{ maxWidth: "250px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Reports */}
      <Row className="g-3">
        {filteredReports.map((report) => (
          <Col md={6} lg={4} key={report._id}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body className="d-flex flex-column">
                {/* Title */}
                <h6 className="fw-bold">{report.reportTitle}</h6>

                {/* Category */}
                <Badge bg="info" className="mb-2 w-fit">
                  {report.reportCategory}
                </Badge>

                {/* Description */}
                <p className="text-muted small mb-3">
                  {report.reportDescription}
                </p>

                {/* Priority */}
                <Badge bg={getPriorityColor(report.reportPriority)}>
                  {report.reportPriority?.toUpperCase()}
                </Badge>

                {/* Footer */}
                <div className="mt-auto small text-muted mt-3">
                  {new Date(report.createdAt).toLocaleString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredReports.length === 0 && (
        <div className="text-center mt-5">
          <h5>No Reports Found</h5>
        </div>
      )}
    </Container>
  );
}

export default Report;
