import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Table,
  Badge,
  Modal,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  activateEmployee,
  deactivateEmployee,
  viewEmployees,
} from "../../../services/employeeService";
import "./ViewBranchEmployee.css";
import BACKEND_URL from "../../../services/uploadsBaseUrl";

function ViewBranchEmployee() {
  // delete product modal
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectEmployee, setSelectEmploye] = useState(null);

  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await viewEmployees();
        setEmployee(response.employee);
        console.log(response.employee);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeactivate = async (id) => {
    try {
      await deactivateEmployee(id);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateEmployee(id);

      window.location.reload();
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
      <div>
        <div className="mb-3 text-center">
          <h2>View Employee Details</h2>
        </div>

        {/* View employee in table format */}
        <div>
          {employee.length === 0 ? (
            <p>No Employee Found.</p>
          ) : (
            <Table
              bordered
              hover
              responsive="sm"
              className="text-center w-100 custom-emp-table"
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Employee Image</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Employee Phone</th>
                  <th>Employee Address</th>
                  <th>Employee QR code</th>
                  <th>Employee Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="emp-profile-image"
                        src={
                          emp.employeeImage
                            ? `${BACKEND_URL}/${emp.employeeImage}`
                            : "/src/assets/images/defaultImage.png"
                        }
                        alt={emp.employeeName}
                      />
                    </td>
                    <td>{emp.employeeId}</td>
                    <td>{emp.employeeName}</td>
                    <td>{emp.employeePhone}</td>
                    <td>{emp.employeeAddress}</td>
                    <td>
                      <img
                        src={emp.qrCode}
                        alt={emp.employeeName}
                        className="emp-qr-code"
                      />
                    </td>
                    <td>
                      {emp.isActive ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge variant="outline-danger">De-Active</Badge>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {emp.isActive ? (
                          <Button
                            variant="primary"
                            onClick={() => {
                              navigate(
                                `/branchDashboard/editBranchEmployee/${emp._id}`,
                                { state: emp },
                              );
                            }}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button variant="primary" disabled>
                            Edit
                          </Button>
                        )}

                        {emp.isActive ? (
                          <Button
                            onClick={() => {
                              handleShow();
                              setSelectEmploye(emp);
                            }}
                            variant="outline-danger"
                          >
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleActivate(emp?._id);
                            }}
                            variant="outline-success"
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* Connfirmation message for deactivating the Employee */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>!Warning</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure, You want to Deactivate the Employee{" "}
            {selectEmployee?.employeeName}?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeactivate(selectEmployee?._id);
                handleClose();
              }}
            >
              De-activate
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ViewBranchEmployee;
