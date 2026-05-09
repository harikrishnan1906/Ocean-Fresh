import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getInventoryProducts,
  updateInventoryAPI,
} from "../../../services/branchService";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  FloatingLabel,
  Spinner,
  Badge,
  Table,
} from "react-bootstrap";

function Inventary() {
  const [products, setProducts] = useState([]);
  const [inputQty, setInputQty] = useState({});
  const [loading, setLoading] = useState(true);

  const handleInputChange = (productId, value) => {
    setInputQty((prev) => ({
      ...prev,
      [productId]: Number(value),
    }));
  };

  useEffect(() => {
    const getProductsForInventory = async () => {
      try {
        const response = await getInventoryProducts();
        setProducts(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProductsForInventory();
  }, []);

  const handleUpdateInventory = async (productId, action, qty = 1) => {
    try {
      await updateInventoryAPI({
        productId,
        action,
        quantity: qty,
      });

      const response = await getInventoryProducts();
      setProducts(response.data);

      setInputQty((prev) => ({ ...prev, [productId]: "" }));
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
      <div className="p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Inventory Management</h3>
        </div>

        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={4}>
            <div className="p-3 bg-white shadow-sm rounded-3 text-center">
              <h6 className="text-muted">Total Products</h6>
              <h4 className="fw-bold text-success">
                {products.length ? products.length : 0}
              </h4>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white shadow-sm rounded-3 text-center">
              <h6 className="text-muted">Out of Stock</h6>
              <h4 className="fw-bold text-danger">
                {products.filter((p) => p.quantity === 0).length}
              </h4>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white shadow-sm rounded-3 text-center">
              <h6 className="text-muted">Low Stock</h6>
              <h4 className="fw-bold text-warning">
                {
                  products.filter((p) => p.quantity > 0 && p.quantity < 5)
                    .length
                }
              </h4>
            </div>
          </Col>
        </Row>

        {/* Table */}
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <p>No Inventory Data</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table
              hover
              className="align-middle text-center bg-white shadow-sm rounded-3"
            >
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Update Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr key={item._id}>
                    {/* Index */}
                    <td>{index + 1}</td>

                    {/* Product Info */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            item.productImage
                              ? `http://localhost:5069/${item.productImage}`
                              : "/src/assets/images/defaultImage.png"
                          }
                          alt={item.productName}
                          style={{
                            width: "70px",
                            height: "60px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />

                        <div className="text-start">
                          <div className="fw-semibold">{item.productName}</div>
                          <small className="text-muted">{item.productId}</small>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td>₹ {item.productPrice}</td>

                    {/* Status */}
                    <td>
                      {item.quantity === 0 ? (
                        <Badge bg="danger">Out of Stock</Badge>
                      ) : item.quantity < 5 ? (
                        <Badge bg="warning">Low Stock</Badge>
                      ) : (
                        <Badge bg="success">Available</Badge>
                      )}
                    </td>

                    {/* Quantity */}
                    <td>
                      <span className="fw-bold">{item.quantity}</span> kg
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        {/* Decrease */}
                        <Button
                          size="sm"
                          variant="outline-danger"
                          disabled={item.quantity === 0}
                          onClick={() =>
                            handleUpdateInventory(item._id, "subract", 1)
                          }
                        >
                          −
                        </Button>

                        {/* Input */}
                        <input
                          type="number"
                          min="1"
                          value={inputQty[item._id] || ""}
                          onChange={(e) =>
                            handleInputChange(item._id, e.target.value)
                          }
                          style={{
                            width: "60px",
                            textAlign: "center",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Add Stock */}
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() =>
                            handleUpdateInventory(
                              item._id,
                              "add",
                              inputQty[item._id] || 1,
                            )
                          }
                        >
                          Add
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

export default Inventary;
