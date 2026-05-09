import React from "react";
import { Outlet } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,  
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function OnlineOrders() {
  return (
    <>
      <div className="d-flex justify-content-around w-100 bg-dark p-3 rounded-3">
        <Button
          as={Link}
          className="w-25 fw-bolder"
          to="/branchDashboard/OnlineOrders/NewOrders"
          variant="light"
        >
          New Orders
        </Button>

        <Button
          as={Link}
          className="w-25 fw-bolder"
          to="/branchDashboard/OnlineOrders/ActiveOrders"
          variant="light"
        >
          Active Orders
        </Button>

        <Button
          as={Link}
          className="w-25 fw-bolder"
          to="/branchDashboard/OnlineOrders/OrderHistory"
          variant="light"
        >
          Order History
        </Button>
      </div>
      <Outlet />
    </>
  );
}

export default OnlineOrders;
