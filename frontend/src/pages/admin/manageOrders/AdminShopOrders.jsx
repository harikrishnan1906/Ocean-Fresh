import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Badge } from "react-bootstrap";
import { getShopOrdersAPI } from "../../../services/adminService";

function AdminShopOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getShopOrdersAPI();
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
      <h4 className="fw-bold mb-4">Shop Orders </h4>

      {orders.length === 0 ? (
        <p className="text-center">No shop orders found</p>
      ) : (
        <Table bordered hover responsive className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Branch</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Customer</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((ord, index) => (
              <tr key={ord._id}>
                <td>{index + 1}</td>

                {/* PRODUCTS LIST */}
                <td>
                  {ord.items?.map((item, i) => (
                    <div key={i} className="text-start mb-2">
                      <strong>{item.productName}</strong>
                      <br />
                      <small>
                        Qty: {item.quantity} | ₹{item.price}
                      </small>
                    </div>
                  ))}
                </td>

                {/* BRANCH */}
                <td>{ord.branchId?.branchName}</td>

                {/* TOTAL */}
                <td className="fw-bold">₹{ord.totalAmount}</td>

                {/* PAYMENT */}
                <td>
                  <Badge
                    bg={ord.paymentMethod === "upi" ? "success" : "secondary"}
                  >
                    {ord.paymentMethod.toUpperCase()}
                  </Badge>
                </td>

                {/* CUSTOMER */}
                <td>{ord.customerName || "Walk-in"}</td>

                {/* DATE */}
                <td>{new Date(ord.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminShopOrders;
