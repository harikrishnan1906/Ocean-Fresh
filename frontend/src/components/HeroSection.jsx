import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section text-white">
      {/* floating bubbles */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>

      <Container>
        <Row className="align-items-center">
          {/* LEFT CONTENT */}
          <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
            <div className="delivery-badge">
              <span className="pulse-dot"></span>
              Now delivering to 30+ locations
            </div>

            <h1 className="hero-title">
              Premium Fresh Fish <br />
              <span className="highlight">Delivered to Your Door</span>
            </h1>

            <p className="hero-desc">
              From ocean to your plate in hours. Order from your nearest branch
              and experience the freshest seafood with our quality-assured
              delivery service.
            </p>

            {/* LOCATION SELECTOR */}

            {/* <div className="location-box">
              <Form.Label>Select your district</Form.Label>

              <div className="d-flex gap-2">
                <Form.Select className="district-select">
                  <option>Choose a district...</option>
                  <option>Colombo</option>
                  <option>Gampaha</option>
                  <option>Kalutara</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                  <option>Matara</option>
                </Form.Select>

                <Button className="find-btn">Find</Button>
              </div>
            </div> */}

            {/* ACTION BUTTONS */}

            <div className="hero-buttons">
              <Button className="branch-btn">Find Branches</Button>

              <Button variant="outline-light" className="browse-btn">
                Browse Products
              </Button>
            </div>
          </Col>

          {/* RIGHT VISUAL */}

          <Col lg={6} className="d-none d-lg-block">
            <div className="hero-products">
              <div className="product-cards">
                <div className="emoji">🐟</div>
                <h5>Fresh Salmon</h5>
                <p>Just arrived</p>
                <span>900/kg</span>
              </div>

              <div className="product-cards offset">
                <div className="emoji">🦐</div>
                <h5>Prawns</h5>
                <p>Premium quality</p>
                <span>500/kg</span>
              </div>

              <div className="product-cards">
                <div className="emoji">🦀</div>
                <h5>Crab</h5>
                <p>Wild caught</p>
                <span>1000/kg</span>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
