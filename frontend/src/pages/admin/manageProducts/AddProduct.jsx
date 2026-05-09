import React from 'react';
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
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const form = e.target;
    const formData = new FormData();
    
    formData.append("productName", form.productName.value);
    formData.append("productDescription", form.productDescription.value);
    formData.append("productCategory", form.productCategory.value);
    formData.append("fishType", form.fishType.value);
    formData.append("productPrice", form.productPrice.value);
    formData.append("productUnit", form.productUnit.value);

    formData.append("productImage", form.productImage.files[0]);

    try{

      const response = await API.post("/product/addProduct", formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("The new product details sent to the backend successfully");
      console.log(response.data);
      form.reset();
      alert(response.data.message);
    }
    catch(err){
      if(err.response && err.response.data){
        alert(err.response.data.message);
      }
      else{
        alert("Something went wrong...!")
      }
      console.log("Error in the product creation" ,err);
      console.log(err.response.data);  
    }
  }
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Add New Product</h2>
        <p className="text-muted">Create a new product for inventory</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="shadow-sm rounded-4 p-4 bg-white">
            <Form onSubmit={handleSubmit}>
              {/* IMAGE PREVIEW */}
              <div className="text-center mb-4">
                <img
                  id="previewImg"
                  src="/defaultImage.png"
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <div className="small text-muted mt-2">
                  Product Image Preview
                </div>
              </div>

              {/* IMAGE INPUT */}
              <FloatingLabel label="Upload Product Image" className="mb-3">
                <Form.Control
                  required
                  type="file"
                  name="productImage"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        document.getElementById("previewImg").src =
                          reader.result;
                      };
                      reader.readAsDataURL(file);
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
                      placeholder="Enter product name"
                    />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Price" className="mb-3">
                    <Form.Control
                      required
                      type="number"
                      name="productPrice"
                      placeholder="Enter price"
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
                  placeholder="Enter description"
                />
              </FloatingLabel>

              {/* CATEGORY + TYPE */}
              <Row>
                <Col md={6}>
                  <FloatingLabel label="Category" className="mb-3">
                    <Form.Select name="productCategory" required>
                      <option value="">Select Category</option>
                      <option value="Premium">Premium</option>
                      <option value="Regular">Regular</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Fish Type" className="mb-3">
                    <Form.Select name="fishType" required>
                      <option value="">Select Type</option>
                      <option value="Sea">Sea</option>
                      <option value="FreshWater">Fresh Water</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* UNIT */}
              <FloatingLabel label="Unit (kg, piece, etc.)" className="mb-3">
                <Form.Control required name="productUnit" defaultValue="kg" />
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
                  Create Product
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct