import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import { submitReportAPI } from "../../services/feedbackService";
import { useNavigate } from "react-router-dom";

function CustomerReports() {
  const navigate = useNavigate();
  const handleReport = async (e) => {
    e.preventDefault();
    const form = e.target;
    const report = {
      reportCategory: form.reportCategory.value,
      reportTitle: form.reportTitle.value,
      reportDescription: form.reportDescription.value,
      reportReference: form.reportReference.value,
      reportPriority: form.reportPriority.value,
    };
    try {
      const response = await submitReportAPI(report);
      console.log(response);
      form.reset();
      alert("Your report submitted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container className="py-3">
        {/* Title */}
        <Row className="mb-3">
          <Col>
            <h4 className="text-center">Report an Issue</h4>
            <p className="text-center text-muted small">
              You can report issues manually or scan QR for quick reporting
            </p>
          </Col>
        </Row>

        {/* QR Scan Button */}
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <p className="mb-2">Quick Feedback using QR</p>

                <Button variant="primary" onClick={() => navigate("/scan")}>
                  Scan QR Code
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* OR Divider */}
        <Row className="text-center mb-3">
          <Col>
            <Badge bg="secondary">OR</Badge>
          </Col>
        </Row>

        {/* Form */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Form onSubmit={handleReport}>
                  {/* Report Type */}
                  <Form.Group className="mb-3">
                    <Form.Label>Report Category</Form.Label>
                    <Form.Select name="reportCategory" required>
                      <option value="">Select category</option>
                      <option value="employee">Employee</option>
                      <option value="branch">Branch</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Title */}
                  <Form.Group className="mb-3">
                    <Form.Label>Issue Title</Form.Label>
                    <Form.Control
                      name="reportTitle"
                      type="text"
                      placeholder="Short title of the issue"
                    />
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="reportDescription"
                      required
                      as="textarea"
                      rows={4}
                      placeholder="Explain the issue clearly..."
                    />
                  </Form.Group>

                  {/* Optional Reference */}
                  <Form.Group className="mb-3">
                    <Form.Label>Reference (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      name="reportReference"
                      placeholder="Employee ID / Branch Name / Page URL"
                    />
                  </Form.Group>

                  {/* Priority */}
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select name="reportPriority">
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Submit */}
                  <div className="d-grid">
                    <Button type="submit" variant="danger">
                      Submit Report
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CustomerReports;
