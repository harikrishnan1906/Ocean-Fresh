import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function GeneralFooter() {
  return (
    <>
      <footer className="footer-section">
        <Container>
          <Row className="gy-5 justify-content-between">
            {/* Logo + About */}

            <Col md={6} lg={4}>
              <div className="footer-logo">
                <div className="logo-icon">🌊</div>

                <span className="logo-text">OceanFresh</span>
              </div>

              <p className="footer-desc">
                Premium fresh seafood delivered from our trusted network of
                branches directly to your doorstep.
              </p>
            </Col>

           

            {/* Contact */}

            <Col md={6} lg={3}>
              <h5 className="footer-title">Contact</h5>

              <ul className="footer-links">
                <li>📧 support@oceanfresh.com</li>
                <li>📞 +94 11 234 5678</li>
                <li>⏰ Mon - Sat: 6AM - 8PM</li>
              </ul>
            </Col>
          </Row>

          {/* Divider */}

          <div className="footer-divider"></div>

          {/* Bottom */}

          <div className="footer-bottom">
            © 2024 <span>OceanFresh</span>. All rights reserved.
          </div>
        </Container>
      </footer>
    </>
  );
}

export default GeneralFooter