import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Features.css";

function Features() {
  const features = [
    {
      icon: "🛒",
      title: "Online Ordering",
      desc: "Order fresh seafood from multiple branches with easy checkout and tracking."
    },
    {
      icon: "📍",
      title: "Branch Network",
      desc: "Access our growing network of branches across districts for faster delivery."
    },
    {
      icon: "📱",
      title: "QR Feedback",
      desc: "Rate our employees via QR codes for continuous service improvement."
    },
    {
      icon: "📊",
      title: "Quality Analytics",
      desc: "Data-driven insights to ensure the best service quality across all branches."
    }
  ];

  return (
    <section className="features-section">

      <Container>

        {/* Title */}

        <div className="text-center mb-5">
          <h2 className="features-title">
            Why Choose OceanFresh?
          </h2>

          <p className="features-subtitle">
            Experience the best seafood marketplace with our innovative features designed for freshness and quality.
          </p>
        </div>

        {/* Feature Cards */}

        <Row className="g-4">

          {features.map((feature, index) => (
            <Col key={index} xs={12} md={6} lg={3}>

              <Card className="feature-card text-center">

                <Card.Body>

                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <h5 className="feature-title">
                    {feature.title}
                  </h5>

                  <p className="feature-desc">
                    {feature.desc}
                  </p>

                </Card.Body>

              </Card>

            </Col>
          ))}

        </Row>

      </Container>

    </section>
  );
}

export default Features;