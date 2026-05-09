import React from "react";
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
import { addEmployee } from "../../../services/employeeService";

function AddBranchEmployee() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("employeeName", form.employeeName.value);
    formData.append("employeePhone", form.employeePhone.value);
    formData.append("employeeAddress", form.employeeAddress.value);

    if (form.employeeImage.files.length > 0) {
      formData.append("employeeImage", form.employeeImage.files[0]);
    }

    try {
      const response = await addEmployee(formData);

      console.log("The Employee details sent to the backend");
      console.log(response);

      form.reset();
      alert(response.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
return (
  <>
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Add New Employee</h2>
        <p className="text-muted">Fill the details to create an employee</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="shadow-sm rounded p-4 bg-white">
            <Form onSubmit={handleSubmit}>
              {/* IMAGE PREVIEW */}
              <div className="text-center mb-4">
                <img
                  src={
                    document.getElementById("previewImg")?.src ||
                    "/src/assets/images/defaultImage.png"
                  }
                  id="previewImg"
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
                <div className="mt-2 text-muted small">Profile Preview</div>
              </div>

              {/* FILE INPUT */}
              <FloatingLabel
                controlId="employeeImage"
                label="Upload Profile Image"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="file"
                  name="employeeImage"
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

              <Row>
                {/* NAME */}
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
                      placeholder="Enter name"
                    />
                  </FloatingLabel>
                </Col>

                {/* PHONE */}
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
                      placeholder="Enter phone"
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* ADDRESS */}
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
                  placeholder="Enter address"
                />
              </FloatingLabel>

              {/* BUTTONS */}
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
                  Create Employee
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default AddBranchEmployee;
