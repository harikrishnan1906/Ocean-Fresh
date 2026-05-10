import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import API from "../../../services/api";
import { getAllBranchesAPI, updateBranchAPI } from "../../../services/adminService";
import BACKEND_URL from "../../../services/uploadsBaseUrl";

function EditBranch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔹 Fetch branch data
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await getAllBranchesAPI();

       const found = response.data.find((b) => b._id === id);
        setBranch(found);
        setPreview(found?.branchImage);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBranch();
  }, [id]);

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("branchName", form.branchName.value);
    formData.append("branchPhone", form.branchPhone.value);
    formData.append("branchAddress", form.branchAddress.value);
    formData.append("branchCity", form.branchCity.value);
    formData.append("branchArea", form.branchArea.value);
    formData.append("branchPincode", form.branchPincode.value);

    // Only send image if changed
    if (form.branchImage.files.length > 0) {
      formData.append("branchImage", form.branchImage.files[0]);
    }

    try {
      const res = await updateBranchAPI(id, formData);

      alert(res.data.message);
      navigate("/adminDashboard/viewBranch");
    } catch (err) {
      console.log(err);
    }
  };

  if (!branch) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">Edit Branch</h3>

      <div className="shadow-sm p-4 rounded bg-white">
        <Form onSubmit={handleSubmit}>
          {/* IMAGE PREVIEW */}
          <div className="text-center mb-4">
            <img
              src={`${BACKEND_URL}/${preview}`}
              alt="branch"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>

          <Row>
            <Col md={6}>
              <FloatingLabel label="Branch Name" className="mb-3">
                <Form.Control
                  name="branchName"
                  defaultValue={branch.branchName}
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Phone" className="mb-3">
                <Form.Control
                  name="branchPhone"
                  defaultValue={branch.branchPhone}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel label="Address" className="mb-3">
            <Form.Control
              name="branchAddress"
              defaultValue={branch.branchAddress}
              required
            />
          </FloatingLabel>

          <Row>
            <Col md={4}>
              <FloatingLabel label="City" className="mb-3">
                <Form.Control
                  name="branchCity"
                  defaultValue={branch.branchCity}
                />
              </FloatingLabel>
            </Col>

            <Col md={4}>
              <FloatingLabel label="Area" className="mb-3">
                <Form.Control
                  name="branchArea"
                  defaultValue={branch.branchArea}
                />
              </FloatingLabel>
            </Col>

            <Col md={4}>
              <FloatingLabel label="Pincode" className="mb-3">
                <Form.Control
                  name="branchPincode"
                  defaultValue={branch.branchPincode}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* IMAGE UPDATE */}
          <FloatingLabel label="Update Image" className="mb-3">
            <Form.Control
              type="file"
              name="branchImage"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </FloatingLabel>

          {/* BUTTONS */}
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/adminDashboard/viewBranch")}
            >
              Cancel
            </Button>

            <Button type="submit">Save Changes</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditBranch;
