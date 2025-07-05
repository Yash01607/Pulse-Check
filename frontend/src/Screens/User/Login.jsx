import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../actions/UserAction";
import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { data: userData, loading, error } = userLogin;

  const redirectURL = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userData) {
      navigate(redirectURL);
    }
  }, [navigate, userData, redirectURL]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <Form
        onSubmit={submitHandler}
        className="p-4 rounded shadow-lg bg-dark"
      >
        <h1 className="text-center text-light mb-4">Sign In</h1>
        {error && (
          <Message
            key={1}
            error={true}
          >
            {error}
          </Message>
        )}
        {loading && <Loader>Logging In...</Loader>}

        <Form.Group
          controlId="email"
          className="mb-3"
        >
          <Form.Label className="text-light">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary text-light border-0 rounded p-3"
          />
        </Form.Group>

        <Form.Group
          controlId="password"
          className="mb-4"
        >
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary text-light border-0 rounded p-3"
          />
        </Form.Group>

        <Row>
          <Col>
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 text-uppercase"
              style={{
                backgroundColor: "#007bff",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="d-flex justify-content-between">
            <Link
              to={"/forgotpassword"}
              className="text-light text-decoration-none"
            >
              Forgot Password?
            </Link>

            <span className="text-light">
              Don't Have An Account?{" "}
              <Link
                to={redirectURL ? `/signup?redirect=${redirectURL}` : "/signup"}
                className="text-primary text-decoration-none"
              >
                Register
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
