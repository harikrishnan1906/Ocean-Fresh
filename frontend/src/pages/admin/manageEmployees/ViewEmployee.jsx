import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { getAllEmployeesAPI } from "../../../services/adminService";
import BACKEND_URL from "../../../services/uploadsBaseUrl";

function ViewEmployee() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployeesAPI();
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  // 🔍 Filter by branch
  const filteredEmployees = employees.filter((emp) =>
    emp.branchId?.branchName?.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h3 className="mb-0">Employees</h3>
          <small className="text-muted">Manage all branch employees</small>
        </div>

        {/* Search */}
        <Form.Control
          type="text"
          placeholder="Search by branch..."
          style={{ maxWidth: "250px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Cards */}
      <Row className="g-3">
        {filteredEmployees.map((emp) => (
          <Col md={6} lg={4} key={emp._id}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              {/* IMAGE */}
              <div className="text-center mt-3">
                <img
                  src={`${BACKEND_URL}/${emp.employeeImage}`}
                  alt={emp.employeeName}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body className="text-center">
                {/* Name */}
                <h5 className="fw-bold">{emp.employeeName}</h5>

                {/* Branch */}
                <Badge bg="info" className="mb-2">
                  {emp.branchId?.branchName}
                </Badge>

                {/* Details */}
                <p className="mb-1 small text-muted">
                  <i className="fa-solid fa-phone"></i> {emp.employeePhone}
                </p>
                <p className="mb-2 small text-muted">
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {emp.branchId?.branchCity}
                </p>

                {/* Status */}
                <Badge bg={emp.isActive ? "success" : "secondary"}>
                  {emp.isActive ? "Active" : "Inactive"}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredEmployees.length === 0 && (
        <div className="text-center mt-5">
          <h5>No Employees Found</h5>
        </div>
      )}
    </Container>
  );
}

export default ViewEmployee;
