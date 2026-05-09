import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import { Navigate } from "react-router-dom";
import AddBranch from "./pages/admin/manageBranches/AddBranch";
import DeleteBranch from "./pages/admin/manageBranches/DeleteBranch";
import EditBranch from "./pages/admin/manageBranches/EditBranch";
import ViewBranch from "./pages/admin/manageBranches/ViewBranch";
import ViewEmployee from "./pages/admin/manageEmployees/ViewEmployee";
import AddProduct from "./pages/admin/manageProducts/AddProduct";
import DeletedProducts from "./pages/admin/manageProducts/DeletedProducts";
import EditProduct from "./pages/admin/manageProducts/EditProduct";
import ViewProducts from "./pages/admin/manageProducts/ViewProducts";
import ViewUsers from "./pages/admin/manageUsers/ViewUsers";
import EditUsers from "./pages/admin/manageUsers/EditUsers";
import FeedbackReport from "./pages/admin/FeedbackReport";
import BranchDashboardLayout from "./pages/branch/BranchDashboardLayout";
import BranchDashboard from "./pages/branch/BranchDashboard";
import Inventory from "./pages/branch/manageInventory/Inventory";
import AddBranchEmployee from "./pages/branch/manageEmployee/AddBranchEmployee";
import ViewBranchEmployee from "./pages/branch/manageEmployee/ViewBranchEmployee";

import ViewBranchFeedback from "./pages/branch/ViewBranchFeedback";
import EditBranchEmployee from "./pages/branch/manageEmployee/EditBranchEmployee";
import CustomerDashboardLayout from "./pages/customer/CustomerDashboardLayout";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerOrder from "./pages/customer/CustomerOrder";
import CustomerFavorite from "./pages/customer/CustomerFavorite";
import CustomerFeedback from "./pages/customer/CustomerFeedback";
import CustomerProduct from "./pages/customer/CustomerProducts";
import CustomerViewProduct from "./pages/customer/CustomerViewProduct";
import CustomerMyOrders from "./pages/customer/CustomerMyOrders";
import CustomerQRCodeFeedback from "./pages/customer/CustomerQRCodeFeedback";
import NewOrders from "./pages/branch/manageOrder/onlineOrders/NewOrders";
import ActiveOrders from "./pages/branch/manageOrder/onlineOrders/ActiveOrders";
import OrderHistory from "./pages/branch/manageOrder/onlineOrders/OrderHistory";
import OnlineOrders from "./pages/branch/manageOrder/OnlineOrders";
import ScanQR from "./pages/common/ScanQR";
import CustomerReports from "./pages/customer/CustomerReports";
import Payment from "./pages/customer/payment";
import PaymentSuccess from "./pages/customer/PaymentSuccess";
import ShopOrders from "./pages/branch/manageOrder/ShopOrders";
import ShopOrdersHistory from "./pages/branch/manageOrder/ShopOrdersHistory";
import Report from "./pages/admin/Report";

import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import AdminOnlineOrders from "./pages/admin/manageOrders/AdminOnlineOrders";
import AdminShopOrders from "./pages/admin/manageOrders/AdminShopOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Admin layout */}
          <Route path="/adminDashboard" element={<AdminDashboardLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Branch */}
            <Route path="addBranch" element={<AddBranch />} />
            <Route path="deleteBranch" element={<DeleteBranch />} />
            <Route path="editBranch/:id" element={<EditBranch />} />
            <Route path="viewBranch" element={<ViewBranch />} />

            {/* Employee */}
            <Route path="viewEmployee" element={<ViewEmployee />} />

            {/* Products */}
            <Route path="addProducts" element={<AddProduct />} />
            <Route path="deletedProducts" element={<DeletedProducts />} />
            <Route path="editProducts/:id" element={<EditProduct />} />
            <Route path="viewProducts" element={<ViewProducts />} />

            {/* Users */}
            <Route path="viewusers" element={<ViewUsers />} />
            <Route path="editUsers" element={<EditUsers />} />

            {/* orders */}
            <Route path="adminOnlineOrders" element={<AdminOnlineOrders />} />
            <Route path="adminShopOrders" element={<AdminShopOrders />} />
            {/* Feedback */}
            <Route path="feedback" element={<FeedbackReport />} />
            <Route path="reports" element={<Report />} />
          </Route>

          {/* Branch routes */}
          <Route path="/branchDashboard" element={<BranchDashboardLayout />}>
            {/* branch dashboard */}
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<BranchDashboard />} />

            {/* branch inventory */}
            <Route path="branchInventory" element={<Inventory />} />

            {/* branch employee */}
            <Route path="viewBranchEmployee" element={<ViewBranchEmployee />} />
            <Route path="addBranchEmployee" element={<AddBranchEmployee />} />
            <Route
              path="editBranchEmployee/:id"
              element={<EditBranchEmployee />}
            />

            {/* branch orders */}
            {/* online orders */}
            <Route path="OnlineOrders" element={<OnlineOrders />}>
              <Route index element={<Navigate to="NewOrders" />} />

              <Route path="NewOrders" element={<NewOrders />} />

              <Route path="ActiveOrders" element={<ActiveOrders />} />

              <Route path="OrderHistory" element={<OrderHistory />} />
            </Route>

            <Route path="ShopOrders" element={<ShopOrders />} />

            <Route path="ShopOrdersHistory" element={<ShopOrdersHistory />} />

            {/* branch feedback */}
            <Route path="viewBranchFeedback" element={<ViewBranchFeedback />} />
          </Route>

          {/* Customer Routes Layout */}
          <Route
            path="/customerDashboard"
            element={<CustomerDashboardLayout />}
          >
            <Route index element={<Navigate to="customerProfile" />} />

            {/* CUstomer Profile */}
            <Route path="customerProfile" element={<CustomerProfile />} />

            {/* Customer Products */}
            <Route path="customerProducts" element={<CustomerProduct />} />
            <Route
              path="customerViewProduct/:id"
              element={<CustomerViewProduct />}
            />

            {/* Customer Orders */}
            <Route
              path="customerOrder/:branchId/:productId"
              element={<CustomerOrder />}
            />

            {/* customer my order  */}
            <Route path="customerMyOrders" element={<CustomerMyOrders />} />

            {/* Customer Cart */}
            <Route path="customerFavorite" element={<CustomerFavorite />} />

            {/* Customer Report */}
            <Route path="customerReports" element={<CustomerReports />} />

            {/* Customer Feedback */}
            <Route path="customerFeedback" element={<CustomerFeedback />} />

            {/* payment */}
            <Route path="payment" element={<Payment />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
          </Route>

          {/* Customer QR code feedback */}
          <Route
            path="customerQRCodeFeedback"
            element={<CustomerQRCodeFeedback />}
          />

          {/* QR Scanner */}
          <Route path="/scan" element={<ScanQR />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
