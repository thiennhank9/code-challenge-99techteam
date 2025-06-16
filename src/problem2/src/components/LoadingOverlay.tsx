import React from "react";
import { Spin } from "antd";
import "./LoadingOverlay.css"; // Import the CSS for the overlay

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
