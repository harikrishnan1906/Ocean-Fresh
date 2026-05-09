import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function ScanQR() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false,
    );

    scanner.render((decodedText) => {
      console.log("Scanned:", decodedText);

      scanner.clear().catch(() => {});

      if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
      } else {
        navigate(decodedText);
      }
    });

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="text-center">
      <h3>Scan QR Code</h3>

      {/* Camera will appear here */}
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
}

export default ScanQR;
