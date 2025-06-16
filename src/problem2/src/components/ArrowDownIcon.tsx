import React from "react";
import { DownOutlined } from "@ant-design/icons";
import "./ArrowDownIcon.css"; // Optional: Add styles if needed

const ArrowDownIcon: React.FC = () => {
  return (
    <div className="arrow-down-container">
      <DownOutlined className="arrow-down-icon" />
    </div>
  );
};

export default ArrowDownIcon;
