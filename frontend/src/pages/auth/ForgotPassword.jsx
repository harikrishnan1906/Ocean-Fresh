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
import { forgotPasswordAPI } from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    setLoading(true);
    const response = await forgotPasswordAPI({ email });

    setMessage(response.message || "Reset link sent!");
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
        {/* bubbles */}
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>

        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={5}>
              <div className="glass-effect p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Forgot Password</h3>
                  <p className="text-muted small">
                    Enter your email to receive a Temporary password
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                        Sending...
                      </>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </Form>

                {/* Message */}
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

export default ForgotPassword;
