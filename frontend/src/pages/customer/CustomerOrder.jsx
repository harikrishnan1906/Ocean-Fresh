import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetailsAPI,
  placeOrderAPI,
} from "../../services/customerService";
import { useState } from "react";
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
import "./CustomerOrder.css";
import LocationPicker from "../common/LocationPicker";

function CustomerOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { branchId, productId } = useParams();
  const [orderProdut, setOrderProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [branch, setBranch] = useState(null);
  const [quantity, setQuantity] = useState();
  const selectQuantity = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.5, 6, 6.5, 7];
  const [location, setLocation] = useState(null);
  const [customerLat, setCustomerLat] = useState(null);
  const [customerLng, setCustomerLng] = useState(null);

  const [isDeliverable, setIsDeliverable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const deliveryRadius = 5;

  const [orderType, setOrderType] = useState("");
  const [showModal, setShowModal] = useState(false);

  console.log("branchID", branchId);
  console.log("productID", productId);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await getOrderDetailsAPI(productId, branchId);
        setOrderProduct(response.product);
        setCustomer(response.customer);
        setBranch(response.branch);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getOrderDetails();
  }, [productId]);

  // This function receives data from child
  const handleLocationSelect = (loc) => {
    setLocation(loc);
  };

  useEffect(() => {
    if (customer?.customerLat && customer?.customerLng) {
      const initial = {
        lat: parseFloat(customer.customerLat),
        lng: parseFloat(customer.customerLng),
      };

      setLocation(initial);
    }
  }, [customer]);

  //handle the distance calculation

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  useEffect(() => {
    if (location && branch) {
      const distance = getDistance(
        branch.branchLat,
        branch.branchLng,
        location.lat,
        location.lng,
      );

      if (distance <= deliveryRadius) {
        setIsDeliverable(true);
        setOrderType("delivery");
      } else {
        setIsDeliverable(false);
        setOrderType("takeaway");
      }
    }
  }, [location, branch]);

  const handlePlaceOrder = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!location) {
      alert("Please select location");
      return;
    }
    try {
      const orderData = {
        branchId,
        productId,
        quantity,
        paymentMethod,
        orderType,
        customerLat: location.lat,
        customerLng: location.lng,
      };

      let response;

      if (paymentMethod === "cod") {
        response = await placeOrderAPI(orderData);
      } else if (paymentMethod === "online") {
        navigate("/customerDashboard/payment", {
          state: {
            orderData,
            product: orderProdut,
            totalAmount: quantity * orderProdut.productPrice,
          },
        });
        return;
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Container className="py-4">
        {orderProdut && customer ? (
          <Row className="g-4">
            {/*  Product Details */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={
                    orderProdut.productImage
                      ? `http://localhost:5069/${orderProdut.productImage}`
                      : "/src/assets/images/defaultImage.png"
                  }
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body>
                  <h5 className="fw-bold">{orderProdut.productName}</h5>
                  <p className="text-muted small">
                    {orderProdut.productDescription}
                  </p>

                  <div className="mb-2">
                    <strong>₹ {orderProdut.productPrice}/kg</strong>
                  </div>

                  <div className="text-muted small">
                    Category: {orderProdut.productCategory}
                  </div>
                  <div className="text-muted small">
                    Fish Type: {orderProdut.fishType}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/*  Customer Details */}
            <Col xs={12} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Customer Details</h5>

                  <p className="mb-1">
                    <strong>Name:</strong> {customer.name}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {customer.phone}
                  </p>

                  <hr />

                  <h6 className="fw-semibold">Delivery Address</h6>
                  <p className="mb-1">{customer.address}</p>
                  <p className="mb-1">
                    {customer.city} - {customer.pincode}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/*  Order Section */}
            <Col xs={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Order Details</h5>

                  <Row className="g-3">
                    {/* Quantity */}
                    <Col xs={12} md={4}>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Select
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                          <option value="">-select-</option>
                          {selectQuantity.map((qty) => (
                            <option key={qty} value={qty}>
                              {qty} kg
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Order Type */}
                    <Col xs={12} md={4}>
                      <Form.Group>
                        <Form.Label>Order Type</Form.Label>
                        <Form.Select
                          value={orderType}
                          onChange={(e) => setOrderType(e.target.value)}
                        >
                          {isDeliverable && (
                            <option value="delivery">Delivery</option>
                          )}
                          <option value="takeaway">Take Away</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Payment */}
                    <Col xs={12} md={4}>
                      <Form.Group>
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="">Select Payment</option>
                          <option value="cod">Cash on Delivery</option>
                          <option value="online">Online Payment</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3 align-items-center">
                    <Col xs={12} md={6}>
                      {isDeliverable ? (
                        <p className="text-success fw-semibold">
                          Delivery Available 🚚
                        </p>
                      ) : (
                        <p className="text-danger fw-semibold">
                          Only Takeaway Available ❌
                        </p>
                      )}
                    </Col>

                    <Col xs={12} md={6} className="text-md-end">
                      <strong>
                        Total: ₹{" "}
                        {quantity ? quantity * orderProdut.productPrice : 0}
                      </strong>
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <h5 className="fw-bold mb-3">Select Delivery Location</h5>

                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <LocationPicker
                          onLocationSelect={handleLocationSelect}
                          initialPosition={location}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FloatingLabel label="Latitude" className="mb-3">
                          <Form.Control
                            type="text"
                            readOnly
                            value={location ? location.lat : ""}
                          />
                        </FloatingLabel>

                        <FloatingLabel label="Longitude">
                          <Form.Control
                            type="text"
                            readOnly
                            value={location ? location.lng : ""}
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4 text-end">
                    <Button
                      variant="success"
                      onClick={handlePlaceOrder}
                      disabled={!quantity || !paymentMethod || loading}
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="mt-2">Loading Order Details...</p>
          </div>
        )}
      </Container>

      {/* ordered confirmed */}
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        navigate(`/customerDashboard/customerMyOrders`);
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Order Placed Successfully</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Product:</strong> {orderProdut?.productName}
          </p>
          <p>
            <strong>Quantity:</strong> {quantity} kg
          </p>
          <p>
            <strong>Order Type:</strong> {orderType}
          </p>
          <p>
            <strong>Payment:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Total:</strong> ₹{" "}
            {quantity ? quantity * orderProdut?.productPrice : 0}
          </p>
        </Modal.Body>

        <Modal.Footer>
          

          <Button className="w-100"
            variant="primary"
            onClick={() => {
              setShowModal(false);
              navigate(`/customerDashboard/customerMyOrders`);
              }}
          >
           Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerOrder;
