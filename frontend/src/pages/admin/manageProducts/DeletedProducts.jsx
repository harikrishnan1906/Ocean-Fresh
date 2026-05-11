import React from "react";
import API from "../../../services/api";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { restoreProductAPI } from "../../../services/adminService";
import BACKEND_URL from "../../../services/uploadsBaseUrl";
import defaultImage from "../../../assets/images/defaultImage.png";

function DeletedProducts() {
  // restore product modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deletedProduct, setDeletedProduct] = useState([]);

  const [selectProduct, setSelectProduct] = useState(null);

  useEffect(() => {
    const fetchDeletedProduct = async (req, res) => {
      try {
        const response = await API.get("/product/viewDeletedProduct");
        setDeletedProduct(response.data);
        console.log(deletedProduct);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDeletedProduct();
  }, []);

  const handleRestoreProduct = async (id) => {
    try {
      await API.put(`/product/restoreProduct/${id}`);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
 return (
   <div className="container py-4">
     {/* Header */}
     <div className="d-flex justify-content-between align-items-center mb-4">
       <div>
         <h3 className="mb-0">Deleted Products</h3>
         <small className="text-muted">
           Restore previously removed products
         </small>
       </div>
     </div>

     {/* Content */}
     {deletedProduct.length === 0 ? (
       <div className="text-center py-5">
         <h5>No Deleted Products</h5>
         <p className="text-muted">Deleted products will appear here.</p>
       </div>
     ) : (
       <Row className="g-3">
         {deletedProduct.map((pro) => (
           <Col md={4} lg={3} key={pro._id}>
             <Card className="h-100 shadow-sm border-0 rounded-4">
               {/* IMAGE */}
               <Card.Img
                 src={
                   pro.productImage
                     ? `${BACKEND_URL}/${pro.productImage}`
                     : defaultImage
                 }
                 style={{
                   height: "180px",
                   objectFit: "cover",
                   borderTopLeftRadius: "12px",
                   borderTopRightRadius: "12px",
                   opacity: 0.7, // 👈 shows it's inactive
                 }}
               />

               <Card.Body className="d-flex flex-column">
                 {/* NAME */}
                 <h6 className="fw-bold text-muted">{pro.productName}</h6>

                 {/* CATEGORY */}
                 <span className="badge bg-secondary mb-2">
                   {pro.productCategory}
                 </span>

                 {/* TYPE */}
                 <div className="small text-muted mb-2">
                   {pro.fishType} Fish
                 </div>

                 {/* PRICE */}
                 <h6 className="fw-bold mb-3 text-muted">
                   ₹{pro.productPrice}/{pro.productUnit}
                 </h6>

                 {/* ACTION */}
                 <Button
                   variant="success"
                   className="mt-auto"
                   onClick={() => {
                     setSelectProduct(pro);
                     handleShow();
                   }}
                 >
                   Restore Product
                 </Button>
               </Card.Body>
             </Card>
           </Col>
         ))}
       </Row>
     )}

     {/* MODAL */}
     <Modal show={show} onHide={handleClose} centered>
       <Modal.Header closeButton>
         <Modal.Title>Restore Product</Modal.Title>
       </Modal.Header>

       <Modal.Body>
         Are you sure you want to restore{" "}
         <strong>{selectProduct?.productName}</strong>?
       </Modal.Body>

       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Cancel
         </Button>

         <Button
           variant="success"
           onClick={async () => {
             await restoreProductAPI(selectProduct._id);

             // ✅ Update UI without reload
             setDeletedProduct((prev) =>
               prev.filter((p) => p._id !== selectProduct._id),
             );

             handleClose();
           }}
         >
           Restore
         </Button>
       </Modal.Footer>
     </Modal>
   </div>
 );
}

export default DeletedProducts;
