import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { createShopOrderAPI } from "../../../services/shopOrderService";
import { getInventoryProducts } from "../../../services/branchService";
import { useNavigate } from "react-router-dom";

function ShopOrders() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getInventoryProducts();
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.productId === product._id);

      if (exists) {
        return prev.map((p) =>
          p.productId === product._id
            ? {
                ...p,
                quantity: p.quantity + 1,
                total: (p.quantity + 1) * p.price,
              }
            : p,
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          productName: product.productName,
          price: product.productPrice,
          quantity: 1,
          total: product.productPrice,
        },
      ];
    });
  };

  // ➖ Remove item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.total, 0);

  // 🧾 Create order
  const handleCreateOrder = async () => {
    try {
      const data = {
        items: cart,
        totalAmount,
        paymentMethod,
      };

      const response = await createShopOrderAPI(data);
      alert(response.message);

      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="light"
        className="m-2"
        onClick={() => {
          navigate(`/branchDashboard/ShopOrdersHistory`);
        }}
      >
        Shop Order History
      </Button>
      <Container fluid className="py-4">
        <Row>
          {/* LEFT - PRODUCTS */}
          <Col md={8}>
            <h4 className="mb-3">Select Products</h4>
            <Row className="g-3">
              {products.map((prod) => (
                <Col md={4} key={prod._id}>
                  <Card className="p-2 shadow-sm">
                    <Card.Body>
                      <h6>{prod.productName}</h6>
                      <p className="mb-1">₹{prod.productPrice}</p>

                      <Button size="sm" onClick={() => addToCart(prod)}>
                        Add
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* RIGHT - BILL */}
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h5>Generate Shop Order</h5>

              {cart.length === 0 ? (
                <p>No items added</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div>
                        <strong>{item.productName}</strong>
                        <br />
                        <small>
                          {item.quantity} x ₹{item.price}
                        </small>
                      </div>

                      <div>
                        ₹{item.total}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removeItem(item.productId)}
                          className="ms-2"
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  ))}

                  <hr />

                  <h6>Total: ₹{totalAmount}</h6>

                  <Form.Select
                    className="my-2"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                  </Form.Select>

                  <Button className="w-100 mt-2" onClick={handleCreateOrder}>
                    Generate Bill
                  </Button>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShopOrders;
