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
import BACKEND_URL from "../../../../services/uploadsBaseUrl";
import defaulImage from "../../../../assets/images/defaulImage.png";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }
 return (
   <>
     <div className="container py-4">
       {/* Header */}
       <div className="text-center mb-4">
         <h2>Order History</h2>
         <p className="text-muted">All completed and cancelled orders</p>
       </div>

       {orders && orders.length > 0 ? (
         <Row className="g-4">
           {orders.map((ord) => (
             <Col xs={12} sm={6} md={4} lg={3} key={ord._id}>
               <Card className="h-100 border-0 shadow-sm rounded-4">
                 {/* IMAGE */}
                 <div className="position-relative">
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
                       borderTopLeftRadius: "12px",
                       borderTopRightRadius: "12px",
                     }}
                   />

                   {/* STATUS BADGE ON IMAGE */}
                   <Badge
                     bg={ord.orderStatus === "delivered" ? "success" : "danger"}
                     className="position-absolute top-0 end-0 m-2"
                   >
                     {ord.orderStatus}
                   </Badge>
                 </div>

                 <Card.Body className="d-flex flex-column">
                   {/* PRODUCT */}
                   <div className="mb-2">
                     <h6 className="fw-bold mb-1">{ord.productName}</h6>
                     <Badge bg="warning" text="dark">
                       {ord.productId?.productCategory}
                     </Badge>
                   </div>

                   {/* CUSTOMER */}
                   <div className="bg-light rounded p-2 mb-3 small">
                     <div className="fw-semibold">{ord.customerId?.name}</div>
                     <div className="text-muted">{ord.customerId?.phone}</div>
                     <div className="text-muted text-truncate">
                       {ord.address}
                     </div>
                   </div>

                   {/* PRICE DETAILS */}
                   <div className="mb-3">
                     <div className="d-flex justify-content-between small">
                       <span className="text-muted">Qty</span>
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

                   {/* FOOTER */}
                   <div className="mt-auto d-flex justify-content-between align-items-center">
                     <Badge bg="secondary">{ord.orderType}</Badge>

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
                 </Card.Body>
               </Card>
             </Col>
           ))}
         </Row>
       ) : (
         <div className="text-center py-5">
           <h5>No Order History</h5>
           <p className="text-muted">
             Completed and cancelled orders will appear here.
           </p>
         </div>
       )}
     </div>
   </>
 );
}

export default OrderHistory;
