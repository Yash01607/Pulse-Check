import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container
      className="my-5"
      style={{
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          md={6}
          style={{
            color: "#f8f9fa", // Light text color
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
