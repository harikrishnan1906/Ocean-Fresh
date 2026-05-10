import React, { useEffect, useState } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getAllBranchesAPI,
  deactivateBranchAPI,
  activateBranchAPI,
} from "../../../services/adminService";

function ViewBranch() {
  const [branches, setBranches] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await getAllBranchesAPI();
      setBranches(res.data);
    };
    fetchBranches();
  }, []);

  const handleDeactivate = async (id) => {
    await deactivateBranchAPI(id);
    setBranches((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isActive: false } : b)),
    );
  };

  const handleActivate = async (id) => {
    await activateBranchAPI(id);
    setBranches((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isActive: true } : b)),
    );
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Branch Management</h3>

      <Table bordered hover responsive className="text-center">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {branches.map((b) => (
            <tr key={b._id}>
              <td>{b.branchName}</td>
              <td>{b.branchCity}</td>
              <td>{b.branchPhone}</td>

              <td>
                {b.isActive ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="secondary">Inactive</Badge>
                )}
              </td>

              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/adminDashboard/editBranch/${b._id}`)
                    }
                  >
                    Edit
                  </Button>

                  {b.isActive ? (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeactivate(b._id)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleActivate(b._id)}
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
    </Container>
  );
}

export default ViewBranch;
