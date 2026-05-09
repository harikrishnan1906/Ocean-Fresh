import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { getAllUsersAPI } from "../../../services/adminService";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsersAPI();
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Search filter
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h3 className="mb-0">Users</h3>
          <small className="text-muted">All registered customers</small>
        </div>

        {/* Search */}
        <Form.Control
          type="text"
          placeholder="Search user..."
          style={{ maxWidth: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      <Row className="g-3">
        {filteredUsers.map((user) => (
          <Col md={6} lg={4} key={user._id}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body>
                {/* Name */}
                <h5 className="fw-bold">{user.name}</h5>

                {/* Email */}
                <p className="text-muted small mb-1">
                  <i className="fa-solid fa-envelope"></i> {user.email}
                </p>

                {/* Phone */}
                <p className="text-muted small mb-2">
                  <i className="fa-solid fa-phone"></i> {user.phone}
                </p>

                {/* Status */}
                <Badge bg="success">Active</Badge>

                {/* Joined */}
                <div className="mt-2 small text-muted">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredUsers.length === 0 && (
        <div className="text-center mt-5">
          <h5>No Users Found</h5>
        </div>
      )}
    </Container>
  );
}

export default ViewUsers;
