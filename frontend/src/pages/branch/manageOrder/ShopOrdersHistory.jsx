import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { getShopOrderHistory } from "../../../services/shopOrderService";

function ShopOrdersHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getShopOrderHistory();
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h3 className="mb-0">Shop Order History</h3>
          <small className="text-muted">All in-store billing records</small>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h5>No Orders Found</h5>
          <p className="text-muted">
            Your shop billing history will appear here.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <Card key={order._id} className="shadow-sm border-0 rounded-4">
              {/* Header */}
              <Card.Header className="bg-light d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <strong>Order ID:</strong>{" "}
                  <span className="text-muted small">{order._id}</span>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <span className="badge bg-info text-dark">
                    {order.paymentMethod.toUpperCase()}
                  </span>

                  <span className="badge bg-secondary">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </Card.Header>

              {/* Body */}
              <Card.Body>
                {/* Items Table */}
                <div className="table-responsive">
                  <table className="table align-middle mb-3">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items?.map((item, i) => (
                        <tr key={i}>
                          <td className="fw-semibold">{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td className="fw-bold">₹{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">
                    Items: {order.items?.length}
                  </span>

                  <h5 className="mb-0 text-success">
                    Total: ₹{order.totalAmount}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default ShopOrdersHistory;
