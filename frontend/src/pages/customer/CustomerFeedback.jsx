import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerFeedback() {
  const navigate = useNavigate();
  return (
    <div>
      CustomerFeedback
      <button className="btn btn-light m-3" onClick={() => navigate("/scan")}>Scan Employee QR</button>
    </div>
  );
}

export default CustomerFeedback;
