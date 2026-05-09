import React, { useState } from "react";
import GeneralNavbar from "../../components/navbars/GeneralNavbar";
import GeneralFooter from "../../components/footers/GeneralFooter";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";
import { changePasswordAPI } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await changePasswordAPI({
        newPassword,
        confirmPassword,
      });

      setMessage("Password updated successfully");

      setTimeout(() => {
        navigate("/customerDashboard");
      }, 1500);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralNavbar />

      <section className="hero-section d-flex align-items-center justify-content-center min-vh-100 text-white p-3">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>

        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={5}>
              <div className="glass-effect p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Change Password</h3>
                  <p className="text-muted small">Set your new password</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel label="New Password" className="mb-3">
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </FloatingLabel>

                  <FloatingLabel label="Confirm Password" className="mb-3">
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </FloatingLabel>

                  <Button
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={loading}
                    variant="dark"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </Form>

                {message && <p className="text-center mt-3">{message}</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <GeneralFooter />
    </>
  );
}

export default ChangePassword;
