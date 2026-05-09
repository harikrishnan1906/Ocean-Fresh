import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAdminDashboardStatsAPI } from "../../services/adminService";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardStatsAPI();
        setStats(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Live system overview</p>
      </div>

      {/* Stats */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h6 className="text-muted">Total Branches</h6>
            <h4 className="fw-bold">{stats.totalBranches}</h4>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h6 className="text-muted">Total Employees</h6>
            <h4 className="fw-bold">{stats.totalEmployees}</h4>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h6 className="text-muted">Total Orders</h6>
            <h4 className="fw-bold">{stats.totalOrders}</h4>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h6 className="text-muted">Revenue</h6>
            <h4 className="fw-bold">₹{stats.totalRevenue}</h4>
          </Card>
        </Col>
      </Row>

      {/* Quick Navigation */}
      <Row className="g-3">
        <Col md={3}>
          <Card
            className="p-4 shadow-sm border-0 rounded-4"
            onClick={() => navigate("/adminDashboard/adminOnlineOrders")}
            style={{ cursor: "pointer" }}
          >
            <h5>Online Orders</h5>
            <p className="text-muted small">Manage all online orders</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="p-4 shadow-sm border-0 rounded-4"
            onClick={() => navigate("/adminDashboard/adminShopOrders")}
            style={{ cursor: "pointer" }}
          >
            <h5>Shop Orders</h5>
            <p className="text-muted small">Manage all shop orders</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="p-4 shadow-sm border-0 rounded-4"
            onClick={() => navigate("/adminDashboard/feedback")}
            style={{ cursor: "pointer" }}
          >
            <h5>Feedback</h5>
            <p className="text-muted small">Customer reviews</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="p-4 shadow-sm border-0 rounded-4"
            onClick={() => navigate("/adminDashboard/reports")}
            style={{ cursor: "pointer" }}
          >
            <h5>Reports</h5>
            <p className="text-muted small">View issues</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
