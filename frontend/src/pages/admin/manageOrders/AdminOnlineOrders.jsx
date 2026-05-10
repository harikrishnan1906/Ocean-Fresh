import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Badge } from "react-bootstrap";
import { getOnlineOrdersAPI } from "../../../services/adminService";
import BACKEND_URL from "../../../services/uploadsBaseUrl";

function AdminOnlineOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOnlineOrdersAPI();
        setOrders(res?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <h4 className="fw-bold mb-4">Online Orders</h4>

      {orders.length === 0 ? (
        <p className="text-center">No online orders found</p>
      ) : (
        <Table bordered hover responsive className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Branch</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((ord, index) => (
              <tr key={ord._id}>
                <td>{index + 1}</td>

                <td className="d-flex align-items-center gap-2">
                  <img
                    src={
                      ord.productId?.productImage
                        ? `${BACKEND_URL}/${ord.productId.productImage}`
                        : "/defaultImage.png"
                    }
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  {ord.productName}
                </td>

                <td>
                  {ord.customerId?.name}
                  <br />
                  <small>{ord.customerId?.phone}</small>
                </td>

                <td>{ord.branchId?.branchName}</td>
                <td>{ord.quantity}</td>
                <td>₹{ord.totalAmount}</td>

                <td>
                  <Badge
                    bg={ord.paymentStatus === "paid" ? "success" : "danger"}
                  >
                    {ord.paymentStatus}
                  </Badge>
                </td>

                <td>
                  <Badge bg="info">{ord.orderStatus}</Badge>
                </td>

                <td>{new Date(ord.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminOnlineOrders;
