import PropTypes from "prop-types";
import React from "react";

const statusColors = {
  Operational: "bg-success text-white",
  "Degraded Performance": "bg-warning text-dark",
  "Partial Outage": "bg-danger text-white",
  "Major Outage": "bg-dark text-white",
};

const StatusBox = ({ status }) => {
  const colorClass = statusColors[status] || "bg-secondary text-white"; // Default color for unknown status

  return (
    <span
      className={`d-inline-flex align-items-center justify-content-center px-3 py-1 rounded ${colorClass}`}
      style={{ width: "auto" }}
    >
      {status}
    </span>
  );
};

StatusBox.propTypes = {
  status: PropTypes.oneOf([
    "Operational",
    "Degraded Performance",
    "Partial Outage",
    "Major Outage",
  ]).isRequired,
};

export default StatusBox;
