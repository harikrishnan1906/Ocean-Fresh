import React, { useContext, useState, useEffect } from "react";
import GeneralNavbar from "../../components/navbars/GeneralNavbar";
import GeneralFooter from "../../components/footers/GeneralFooter";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const { login, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();

       

        if (response?.type === "customer") {
          navigate("/customerDashboard");
          window.location.reload();
        }

        

        if (response?.type === "admin") {
          navigate("/adminDashboard");
          window.location.reload();
        }

        if (response?.type === "branch") {
          navigate("/branchDashboard");
          window.location.reload();
        }
      } 
      
      catch (err) {
        console.log(err);
      }
    };

    verifyAuth();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data);

      login(
        {
          role: response.role,
          userID: response.userID,
        },
        response.token,
      );

      console.log(response);

      if (response.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      if (response.role === "customer") {
        navigate("/customerDashboard");
        window.location.reload();
      }
      if (response.role === "admin") {
        navigate("/adminDashboard");
        window.location.reload();
      }
      if (response?.role === "branch") {
        navigate("/branchDashboard");
        window.location.reload();
      }
    } catch (err) {
      console.log("login failed", err);
    }
  };
  return (
    <>
      <GeneralNavbar />

      <div>
        <section className="hero-section d-flex align-items-center min-vh-100 text-white">
          {/* floating bubbles */}
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>

          <Container>
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={5}>
                <div className="glass-effect p-4">
                  <div className="mb-3 text-center">
                    <h2>Login</h2>
                  </div>

                  <Form onSubmit={handleSumbit}>
                    <FloatingLabel
                      controlId="email"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="password"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FloatingLabel>

                    <button type="submit" className="btn reg-form-btn w-100">
                      Login
                    </button>
                  </Form>
                  <p className="text-center mt-2">
                    <Link to="/forgotPassword" className="cus-reg-text">
                      Forgot Password?
                    </Link>
                  </p>

                  <div className="text-center mt-3">
                    <p>
                      Don't have an account{" "}
                      <Link to="/register" className="cus-reg-text">
                        Regiter here
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <GeneralFooter />
    </>
  );
}

export default Login;
