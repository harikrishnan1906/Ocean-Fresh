import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  getBranchOrdersAPI,
  updateOrderStatusAPI,
} from "../../../../services/branchService";
import "./NewOrders.css";

function NewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getBranchOrdersAPI();
        console.log(response);

        setOrders(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id);
      const response = await updateOrderStatusAPI(id, status);
      console.log(response);
      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord._id === id ? { ...ord, orderStatus: status } : ord,
        ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className="text-center my-4">
        <h2>New Orders</h2>
      </div>

      <div>
        <Container>
          {orders && orders.length > 0 ? (
            <div className="orders-container">
              {orders
                .filter(
                  (ord) =>
                    ord.orderStatus === "placed" ||
                    ord.orderStatus === "confirmed",
                )
                .map((ord) => (
                  <Card
                    className="h-100 shadow-sm border-0 product-card"
                    key={ord._id}
                  >
                    {/*  Product Section */}
                    <div className="card-img-wrapper">
                      <Card.Img
                        variant="top"
                        style={{ height: "200px", borderRadius: "10px" }}
                        src={
                          ord.productId?.productImage
                            ? `http://localhost:5069/${ord.productId.productImage}`
                            : "/defaultImage.png"
                        }
                        className="product-img"
                      />
                    </div>

                    <Card.Body className="d-flex flex-column">
                      {/* Product Info */}
                      <div className="mb-3">
                        <Card.Title className="fw-bold">
                          {ord.productName}
                        </Card.Title>
                        <Badge bg="warning" className="text-dark">
                          {ord.productId?.productCategory}
                        </Badge>
                      </div>

                      {/* Customer Section */}
                      <div className="p-2 mb-3 bg-light rounded">
                        <p className="mb-1 fw-semibold">
                          <i className="fa-solid fa-universal-access"></i>{" "}
                          {ord.customerId?.name}
                        </p>
                        <p className="mb-1 text-muted">
                          <i className="fa-solid fa-phone"></i>{" "}
                          {ord.customerId?.phone}
                        </p>
                        <p className="mb-0 text-muted small">
                          <i className="fa-solid fa-location-dot"></i>{" "}
                          {ord.address}
                        </p>
                      </div>

                      {/*  Order Section */}
                      <div className="mt-auto">
                        {/* Order Breakdown */}
                        <div className="mb-2">
                          <div className="d-flex justify-content-between small">
                            <span className="text-muted">Quantity</span>
                            <span>{ord.quantity}</span>
                          </div>

                          <div className="d-flex justify-content-between small">
                            <span className="text-muted">Price</span>
                            <span>₹{ord.productPrice}</span>
                          </div>

                          <hr className="my-2" />

                          <div className="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>₹{ord.totalAmount}</span>
                          </div>
                        </div>

                        {/* Status Section */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted small">
                              Order Status
                            </span>
                            <Badge
                              bg={
                                ord.orderStatus === "delivered"
                                  ? "success"
                                  : ord.orderStatus === "cancelled"
                                    ? "danger"
                                    : "warning"
                              }
                              className="text-light"
                            >
                              {ord.orderStatus}
                            </Badge>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small">Payment</span>
                            <Badge
                              bg={
                                ord.paymentStatus === "paid"
                                  ? "success"
                                  : ord.paymentMethod === "cod"
                                    ? "warning"
                                    : "danger"
                              }
                            >
                              {ord.paymentMethod === "cod" &&
                              ord.paymentStatus !== "paid"
                                ? "Collect Cash"
                                : ord.paymentStatus}
                            </Badge>
                          </div>
                        </div>

                        {/* Actions */}
                        {ord.orderStatus === "placed" && (
                          <div className="d-grid gap-2">
                            <Button
                              size="sm"
                              className="fw-bolder"
                              variant="outline-success"
                              onClick={() => updateStatus(ord._id, "confirmed")}
                              disabled={actionLoading === ord._id}
                            >
                              {actionLoading === ord._id ? (
                                <Spinner size="sm" />
                              ) : (
                                "Confirm Order"
                              )}
                            </Button>

                            <Button
                              size="sm"
                              className="fw-bolder"
                              variant="outline-danger"
                              onClick={() => updateStatus(ord._id, "cancelled")}
                              disabled={actionLoading === ord._id}
                            >
                              {actionLoading === ord._id ? (
                                <Spinner size="sm" />
                              ) : (
                                "Reject Order"
                              )}
                            </Button>
                          </div>
                        )}

                        {ord.orderStatus === "confirmed" && (
                          <div className="d-grid gap-2">
                            <Button
                              size="sm"
                              className="fw-bolder"
                              variant="outline-primary"
                              onClick={() => updateStatus(ord._id, "preparing")}
                              disabled={actionLoading === ord._id}
                            >
                              {actionLoading === ord._id ? (
                                <Spinner size="sm" />
                              ) : (
                                "Start Preparing"
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <p className="text-center">No orders available</p>
          )}
        </Container>
      </div>
    </>
  );
}

export default NewOrders;
