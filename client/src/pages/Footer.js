import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Copyright. <b><u>FitnessTracker.com</u></b>.</p>
    </footer>
  );
};

const footerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#413f3f",
  color:"white",
  textAlign: "center",
  padding: "5px 0",
  borderTop: "1px solid #ddd",
};

export default Footer;
