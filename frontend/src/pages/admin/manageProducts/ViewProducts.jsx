import React, { useEffect, useState } from "react";
import API from "../../../services/api";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { deleteProductAPI } from "../../../services/adminService";
import BACKEND_URL from "../../../services/uploadsBaseUrl";

function ViewProducts() {
  // delete product modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [selectProduct, setSelectProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async (req, res) => {
      try {
        const response = await API.get("/product/viewProduct");
        setProducts(response.data);
        console.log(response.data);

        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/product/deleteProduct/${id}`);

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
         <h3 className="mb-0">Products</h3>
         <small className="text-muted">Manage all products</small>
       </div>

       <Button onClick={() => navigate("/adminDashboard/addProduct")}>
         + Add Product
       </Button>
     </div>

     {/* Grid */}
     {products.length === 0 ? (
       <div className="text-center py-5">
         <Spinner />
         <p className="mt-2">Loading Products...</p>
       </div>
     ) : (
       <Row className="g-3">
         {products.map((pro) => (
           <Col md={4} lg={3} key={pro._id}>
             <Card className="h-100 shadow-sm border-0 rounded-4">
               {/* IMAGE */}
               <Card.Img
                 src={`${BACKEND_URL}/${pro.productImage}`}
                 style={{
                   height: "180px",
                   objectFit: "cover",
                   borderTopLeftRadius: "12px",
                   borderTopRightRadius: "12px",
                 }}
               />

               <Card.Body className="d-flex flex-column">
                 {/* NAME */}
                 <h6 className="fw-bold">{pro.productName}</h6>

                 {/* CATEGORY */}
                 <span className="badge bg-warning text-dark mb-2">
                   {pro.productCategory}
                 </span>

                 {/* INFO */}
                 <div className="small text-muted mb-2">
                   {pro.fishType} Fish
                 </div>

                 {/* PRICE */}
                 <h6 className="fw-bold mb-3">
                   ₹{pro.productPrice}/{pro.productUnit}
                 </h6>

                 {/* ACTIONS */}
                 <div className="mt-auto d-flex gap-2">
                   <Button
                     size="sm"
                     variant="primary"
                     onClick={() =>
                       navigate(`/adminDashboard/editProducts/${pro._id}`)
                     }
                   >
                     Edit
                   </Button>

                   <Button
                     size="sm"
                     variant="danger"
                     onClick={() => {
                       setSelectProduct(pro);
                       handleShow();
                     }}
                   >
                     Delete
                   </Button>
                 </div>
               </Card.Body>
             </Card>
           </Col>
         ))}
       </Row>
     )}

     {/* DELETE MODAL */}
     <Modal show={show} onHide={handleClose} centered>
       <Modal.Header closeButton>
         <Modal.Title>Delete Product</Modal.Title>
       </Modal.Header>

       <Modal.Body>
         Are you sure you want to delete{" "}
         <strong>{selectProduct?.productName}</strong>?
       </Modal.Body>

       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Cancel
         </Button>
         <Button
           variant="danger"
           onClick={async () => {
             await deleteProductAPI(selectProduct._id);

             // update UI instead of reload
             setProducts((prev) =>
               prev.filter((p) => p._id !== selectProduct._id),
             );

             handleClose();
           }}
         >
           Delete
         </Button>
       </Modal.Footer>
     </Modal>
   </div>
 );
}

export default ViewProducts;
