import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function PaymentSuccess() {
    const { state } = useLocation();
    const navigate = useNavigate();
  return (
    <>
      <Container className="py-5 d-flex justify-content-center">
        <Card className="p-4 shadow rounded-4 text-center">
          <h3 className="text-success mb-3">Payment Successful 🎉</h3>

          <p>
            <strong>Product:</strong> {state?.product?.productName}
          </p>
          <p>
            <strong>Total Paid:</strong> ₹ {state?.totalAmount}
          </p>

          <Button
            className="mt-3"
            onClick={() => navigate("/customerDashboard/customerMyOrders")}
          >
            View My Orders
          </Button>
        </Card>
      </Container>
    </>
  );
}

export default PaymentSuccess