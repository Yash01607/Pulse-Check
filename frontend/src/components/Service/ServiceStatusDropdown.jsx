import React from "react";
import FormControl from "react-bootstrap/FormControl";

const ServiceStatusDropdown = ({ value, onChange }) => {
  return (
    <FormControl
      as="select"
      value={value}
      onChange={onChange}
      style={{
        borderRadius: "8px",
        padding: "10px 15px",
        border: "1px solid #495057",
        backgroundColor: "#6c757d", // bg-secondary equivalent
        color: "#fff",
        height: "100%",
        marginLeft: "10px",
      }}
    >
      <option
        value="Operational"
        style={{
          color: "#28a745",
          border: "1px solid #28a745",
          backgroundColor: "#495057",
        }}
      >
        Operational
      </option>
      <option
        value="Degraded Performance"
        style={{
          color: "#ffc107",
          border: "1px solid #ffc107",
          backgroundColor: "#495057",
        }}
      >
        Degraded Performance
      </option>
      <option
        value="Partial Outage"
        style={{
          color: "#fd7e14",
          border: "1px solid #fd7e14",
          backgroundColor: "#495057",
        }}
      >
        Partial Outage
      </option>
      <option
        value="Major Outage"
        style={{
          color: "#dc3545",
          border: "1px solid #dc3545",
          backgroundColor: "#495057",
        }}
      >
        Major Outage
      </option>
    </FormControl>
  );
};

export default ServiceStatusDropdown;
