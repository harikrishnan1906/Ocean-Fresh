import React from "react";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../../components/navbars/CustomerNavbar";

function CustomerDashboardLayout() {
  return (
    <>
      <CustomerNavbar />

      <div>
        <div>
          <section className="hero-section d-flex align-items-center justify-content-center min-vh-100 text-white p-4">
            {/* floating bubbles */}
            <div className="bubble bubble1"></div>
            <div className="bubble bubble2"></div>
            <div className="bubble bubble3"></div>

            <div className="glass-effect w-100" style={{ maxWidth: "2000px" }}>
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CustomerDashboardLayout;
