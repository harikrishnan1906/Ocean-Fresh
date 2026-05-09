import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../../../services/api";
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

function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async (req, res) => {
      try {
        const response = await API.get(`/product/getProduct/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("productName", form.productName.value);
    formData.append("productDescription", form.productDescription.value);
    formData.append("productCategory", form.productCategory.value);
    formData.append("fishType", form.fishType.value);
    formData.append("productPrice", form.productPrice.value);
    formData.append("productUnit", form.productUnit.value);

    formData.append("productImage", form.productImage.files[0]);

    try {
      const response = await API.put(`/product/editProduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(
        "The edit product details are sent to the backend successfully",
      );

      console.log(response.data);
      form.reset();
      alert(response.data.message);

      const updated = await API.get(`/product/getProduct/${id}`);
      setProduct(updated.data);
      navigate("/adminDashboard/viewProducts")
    } catch (err) {
      console.log(err);
    }
  };

 return (
   <>
     {product ? (
       <div className="container py-4">
         {/* Header */}
         <div className="text-center mb-4">
           <h2>Edit Product</h2>
           <p className="text-muted">Update product details</p>
         </div>

         <div className="row justify-content-center">
           <div className="col-lg-8">
             <div className="shadow-sm rounded-4 p-4 bg-white">
               {/* IMAGE PREVIEW */}
               <div className="text-center mb-4">
                 <img
                   id="previewImg"
                   src={`http://localhost:5069/${product.productImage}`}
                   alt={product.productName}
                   style={{
                     width: "120px",
                     height: "120px",
                     borderRadius: "12px",
                     objectFit: "cover",
                   }}
                 />
                 <div className="small text-muted mt-2">
                   Current Product Image
                 </div>
               </div>

               <Form onSubmit={handleEditProduct}>
                 {/* IMAGE UPDATE */}
                 <FloatingLabel label="Update Product Image" className="mb-3">
                   <Form.Control
                     type="file"
                     name="productImage"
                     onChange={(e) => {
                       const file = e.target.files[0];
                       if (file) {
                         setProduct((prev) => ({
                           ...prev,
                           preview: URL.createObjectURL(file),
                         }));
                         document.getElementById("previewImg").src =
                           URL.createObjectURL(file);
                       }
                     }}
                   />
                 </FloatingLabel>

                 {/* BASIC INFO */}
                 <Row>
                   <Col md={6}>
                     <FloatingLabel label="Product Name" className="mb-3">
                       <Form.Control
                         required
                         name="productName"
                         defaultValue={product.productName}
                       />
                     </FloatingLabel>
                   </Col>

                   <Col md={6}>
                     <FloatingLabel label="Price" className="mb-3">
                       <Form.Control
                         required
                         type="number"
                         name="productPrice"
                         defaultValue={product.productPrice}
                       />
                     </FloatingLabel>
                   </Col>
                 </Row>

                 {/* DESCRIPTION */}
                 <FloatingLabel label="Description" className="mb-3">
                   <Form.Control
                     required
                     as="textarea"
                     style={{ height: "80px" }}
                     name="productDescription"
                     defaultValue={product.productDescription}
                   />
                 </FloatingLabel>

                 {/* CATEGORY + TYPE */}
                 <Row>
                   <Col md={6}>
                     <FloatingLabel label="Category" className="mb-3">
                       <Form.Select
                         name="productCategory"
                         defaultValue={product.productCategory}
                         required
                       >
                         <option value="">Select Category</option>
                         <option value="Premium">Premium</option>
                         <option value="Regular">Regular</option>
                       </Form.Select>
                     </FloatingLabel>
                   </Col>

                   <Col md={6}>
                     <FloatingLabel label="Fish Type" className="mb-3">
                       <Form.Select
                         name="fishType"
                         defaultValue={product.fishType}
                         required
                       >
                         <option value="">Select Type</option>
                         <option value="Sea">Sea</option>
                         <option value="FreshWater">Fresh Water</option>
                       </Form.Select>
                     </FloatingLabel>
                   </Col>
                 </Row>

                 {/* UNIT */}
                 <FloatingLabel label="Unit" className="mb-3">
                   <Form.Control
                     name="productUnit"
                     defaultValue={product.productUnit}
                     required
                   />
                 </FloatingLabel>

                 {/* BUTTONS */}
                 <div className="d-flex justify-content-end gap-2 mt-4">
                   <Button
                     variant="secondary"
                     onClick={() => navigate("/adminDashboard/viewProducts")}
                   >
                     Cancel
                   </Button>

                   <Button type="submit" variant="primary">
                     Save Changes
                   </Button>
                 </div>
               </Form>
             </div>
           </div>
         </div>
       </div>
     ) : (
       <div className="text-center mt-5">
         <p>Loading Product...</p>
       </div>
     )}
   </>
 );
}

export default EditProduct;
