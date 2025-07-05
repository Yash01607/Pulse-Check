import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

import { register } from "../../actions/UserAction";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { data: userData } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { data: userDataRegister, loading, error } = userRegister;

  const redirectURL = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userData) {
      navigate(redirectURL);
    }
  }, [navigate, userData, redirectURL]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          {
            name,
            email,
            password1: password,
            password2: confirmPassword,
          },
          navigate
        )
      );
    }
  };

  return (
    <FormContainer>
      <Form
        onSubmit={submitHandler}
        className="p-4 rounded shadow-lg bg-dark"
      >
        <h1 className="text-center text-light mb-4">Register</h1>

        {message && <Message error={true}>{message}</Message>}
        {error && <Message error={true}>{error}</Message>}
        {loading && <Loader>Registering User...</Loader>}
        {userDataRegister && (
          <Message error={true}>User Registered Successfully</Message>
        )}

        <Form.Group
          className="mb-3"
          controlId="name"
        >
          <Form.Label className="text-light">Name</Form.Label>
          <Form.Control
            className="bg-secondary text-light border-0 rounded p-3"
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="email"
        >
          <Form.Label className="text-light">Email Address</Form.Label>
          <Form.Control
            className="bg-secondary text-light border-0 rounded p-3"
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {" "}
            {error?.email &&
              error?.email?.map((errorMessage, i) => (
                <Message
                  key={i}
                  error={true}
                >
                  {errorMessage.message}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="password"
        >
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control
            className="bg-secondary text-light border-0 rounded p-3"
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {" "}
            {error?.password1 &&
              error?.password1?.map((errorMessage, i) => (
                <Message
                  key={i}
                  error={true}
                >
                  {errorMessage.message}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="passwordConfirm"
        >
          <Form.Label className="text-light">Confirm Password</Form.Label>
          <Form.Control
            className="bg-secondary text-light border-0 rounded p-3"
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div>
            {" "}
            {error?.password2 &&
              error?.password2?.map((errorMessage, i) => (
                <Message
                  key={i}
                  error={true}
                >
                  {errorMessage.message}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ?{" "}
          <Link to={redirectURL ? `/login?redirect=${redirectURL}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
