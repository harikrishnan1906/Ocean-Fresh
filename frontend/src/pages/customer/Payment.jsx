import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrderAPI } from "../../services/customerService";
import { Container, Card, Button, Spinner } from "react-bootstrap";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { orderData, product, totalAmount } = state;

  const [loading, setLoading] = useState(false);

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);

      const finalOrder = {
        branchId: orderData.branchId,
        productId: orderData.productId,
        quantity: orderData.quantity,
        orderType: orderData.orderType,
        customerLat: orderData.customerLat,
        customerLng: orderData.customerLng,
        paymentMethod: "online",
      };

      await placeOrderAPI(finalOrder);

      navigate("/customerDashboard/paymentSuccess", {
        state: {
          product,
          totalAmount,
        },
      });
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return <h3>Invalid access</h3>;
  }

  if (!orderData?.customerLat || !orderData?.customerLng) {
    return <h3>Location missing. Please go back and select location.</h3>;
  }
  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="fw-bold mb-3 text-center">Payment Page</h4>

        <p>
          <strong>Product:</strong> {product.productName}
        </p>
        <p>
          <strong>Amount:</strong> ₹ {totalAmount}
        </p>

        <div className="mt-4">
          <Button
            variant="success"
            className="w-100 mb-2"
            onClick={handlePaymentSuccess}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>

          <Button
            variant="outline-danger"
            className="w-100"
            onClick={() => navigate(-1)}
          >
            Cancel Payment
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Payment;
