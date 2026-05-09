import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployee, getEmployee } from "../../../services/employeeService";
import "./EditBranchEmployee.css";
import {
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
  Form,
  Spinner,
  Table,
  Badge,
  Modal,
  Button,
} from "react-bootstrap";

function EditBranchEmployee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(id);

        setEmployee(response.employee);

        console.log(response.employee);
      } catch (err) {
        console.log(err);
        alert("Failed to load the employee details")
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("employeeName", form.employeeName.value);
    formData.append("employeeAddress", form.employeeAddress.value);
    formData.append("employeePhone", form.employeePhone.value);
    formData.append("employeeImage", form.employeeImage.files[0]);

    try {
      const response = await editEmployee(id, formData);
      console.log(response);

      alert(response.message);

      navigate("/branchDashboard/viewBranchEmployee");
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
     {employee ? (
       <div className="container py-4">
         {/* Header */}
         <div className="mb-4 text-center">
           <h2>Edit Employee</h2>
           <p className="text-muted">Update employee details</p>
         </div>

         <div className="row shadow-sm rounded p-3 bg-white">
           {/* LEFT SIDE - Images */}
           <div className="col-md-4 text-center border-end">
             <h6 className="mb-3">Profile</h6>

             <img
               src={`http://localhost:5069/${employee.employeeImage}`}
               alt={employee.employeeName}
               style={{
                 width: "120px",
                 height: "120px",
                 objectFit: "cover",
                 borderRadius: "12px",
               }}
               className="mb-3"
             />

             <h6 className="mt-4 mb-2">QR Code</h6>

             <img
               src={employee.qrCode}
               alt="QR Code"
               style={{
                 width: "120px",
               }}
             />

             <div className="mt-3 text-muted small">
               ID: {employee.employeeId}
             </div>
           </div>

           {/* RIGHT SIDE - FORM */}
           <div className="col-md-8">
             <Form onSubmit={handleEditEmployee}>
               <Row>
                 {/* Name */}
                 <Col md={6}>
                   <FloatingLabel
                     controlId="employeeName"
                     label="Employee Name"
                     className="mb-3"
                   >
                     <Form.Control
                       required
                       type="text"
                       name="employeeName"
                       defaultValue={employee.employeeName}
                     />
                   </FloatingLabel>
                 </Col>

                 {/* Phone */}
                 <Col md={6}>
                   <FloatingLabel
                     controlId="employeePhone"
                     label="Phone Number"
                     className="mb-3"
                   >
                     <Form.Control
                       required
                       type="text"
                       name="employeePhone"
                       defaultValue={employee.employeePhone}
                     />
                   </FloatingLabel>
                 </Col>
               </Row>

               {/* Address */}
               <FloatingLabel
                 controlId="employeeAddress"
                 label="Address"
                 className="mb-3"
               >
                 <Form.Control
                   required
                   as="textarea"
                   style={{ height: "80px" }}
                   name="employeeAddress"
                   defaultValue={employee.employeeAddress}
                 />
               </FloatingLabel>

               {/* Image Upload */}
               <FloatingLabel
                 controlId="employeeImage"
                 label="Update Profile Image"
                 className="mb-3"
               >
                 <Form.Control type="file" name="employeeImage" />
               </FloatingLabel>

               {/* Buttons */}
               <div className="d-flex justify-content-end gap-2 mt-4">
                 <Button
                   variant="secondary"
                   onClick={() =>
                     navigate("/branchDashboard/viewBranchEmployee")
                   }
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
     ) : (
       <div className="text-center py-5">
         <h5>Loading Employee Details...</h5>
       </div>
     )}
   </>
 );
}

export default EditBranchEmployee;
