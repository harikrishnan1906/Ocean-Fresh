import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  cancelMyOrderAPI,
  getMyOrdersAPI,
} from "../../services/customerService";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  FloatingLabel,
  Button,
  Modal,
} from "react-bootstrap";
import BACKEND_URL from "../../services/uploadsBaseUrl";
import defaulImage from "../../assets/images/defaulImage.png";

function CustomerMyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const response = await getMyOrdersAPI();
        setMyOrders(response.data);
        console.log(typeof myOrders);

        console.log(response);
      } catch (err) {
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    };

    getMyOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelMyOrderAPI(orderId);
      console.log(response);
     setMyOrders((prev) => prev.filter((o) => o._id !== orderId));
     window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


   if (loading) {
     return (
       <div
         className="d-flex justify-content-center align-items-center"
         style={{ height: "60vh" }}
       >
         <Spinner animation="border" />
       </div>
     );
   }
  return (
    <>
      <center>
        <h2>My orders</h2>
      </center>
      <Container className="py-4">
        {myOrders.length === 0 ? (
          <p className="text-center">No orders</p>
        ) : (
          <Row className="g-4">
            {myOrders.map((ord) => (
              <Col xs={12} sm={6} lg={4} key={ord._id}>
                <Card
                  className=" my-order-card shadow-sm border-0 rounded-4 h-100 d-flex flex-column"
                  style={{ minHeight: "420px" }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      ord.productId?.productImage
                        ? `${BACKEND_URL}/${ord.productId.productImage}`
                        : defaulImage
                    }
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />

                  <Card.Body className="d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="fw-bold mb-2">{ord.productName}</h5>

                      <p className="text-muted small mb-2">
                        {ord.productId?.productCategory} •{" "}
                        {ord.productId?.fishType}
                      </p>

                      <hr className="my-2" />

                      <div className="mb-1">
                        <span className="text-muted">Price:</span>{" "}
                        <strong>₹ {ord.productPrice}/kg</strong>
                      </div>

                      <div className="mb-1">
                        <span className="text-muted">Quantity:</span>{" "}
                        {ord.quantity} kg
                      </div>

                      <div className="mb-1">
                        <span className="text-muted">Total Amount:</span>{" "}
                        <strong>₹ {ord.totalAmount}</strong>
                      </div>

                      <div className="mb-1">
                        <span className="text-muted">Order Type:</span>{" "}
                        {ord.orderType}
                      </div>

                      <div className="mb-2">
                        <span className="text-muted">Status:</span>{" "}
                        <span
                          className={
                            ord.orderStatus === "delivered"
                              ? "text-success fw-semibold"
                              : ord.orderStatus === "cancelled"
                                ? "text-danger fw-semibold"
                                : "text-warning fw-semibold"
                          }
                        >
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted">Payment:</span>{" "}
                      <span
                        className={
                          ord.paymentStatus === "paid"
                            ? "text-success fw-semibold"
                            : ord.paymentStatus === "failed"
                              ? "text-danger fw-semibold"
                              : "text-warning fw-semibold"
                        }
                      >
                        {ord.paymentStatus}
                      </span>
                    </div>

                    {ord.orderStatus !== "delivered" &&
                      ord.orderStatus !== "cancelled" && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="w-100 mt-2"
                          onClick={() => handleCancelOrder(ord._id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                  </Card.Body>

                  {ord.paymentMethod === "online" &&
                    ord.paymentStatus !== "paid" &&
                    ord.orderStatus !== "cancelled" && (
                      <Button
                        variant="success"
                        size="sm"
                        className="w-100 mt-2"
                        onClick={() => {
                          navigate("/customerDashboard/payment", {
                            state: {
                              orderData: {
                                branchId: ord.branchId,
                                productId: ord.productId?._id,
                                quantity: ord.quantity,
                                orderType: ord.orderType,
                                customerLat: ord.customerLat,
                                customerLng: ord.customerLng,
                              },
                              product: ord.productId,
                              totalAmount: ord.totalAmount,
                            },
                          });
                        }}
                      >
                        Pay Now
                      </Button>
                    )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Hover Effect */}
      <style>
        {`
      .my-order-card {
        transition: all 0.3s ease;
      }
      .my-order-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
    `}
      </style>
    </>
  );
}

export default CustomerMyOrders;
