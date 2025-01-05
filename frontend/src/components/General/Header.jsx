import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/UserAction";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { data: userData } = userLogin;

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="sm"
        collapseOnSelect
      >
        <Container className="mt-3">
          <Row className="w-100">
            <Col className="py-auto">
              <SearchBox />
            </Col>
            <Col>
              <Nav.Link
                as={Link}
                to="/"
                className="mx-auto text-center"
              >
                <strong>
                  <h2>Pulse Check</h2>
                </strong>
              </Nav.Link>
            </Col>
            <Col>
              <Navbar.Toggle aria-controls="navbarScroll" />

              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px", zIndex: 999999999 }}
                  navbarScroll
                >
                  {userData ? (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/organization"
                      >
                        Manage Organizations
                      </Nav.Link>

                      <NavDropdown
                        title={userData.name}
                        id="username"
                      >
                        <NavDropdown.Item
                          to="/profile"
                          as={Link}
                        >
                          Profile
                        </NavDropdown.Item>

                        {userData?.isAdmin && (
                          <>
                            <NavDropdown.Item
                              to="/allOrders"
                              as={Link}
                            >
                              Manage Services
                            </NavDropdown.Item>
                          </>
                        )}
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/login"
                      >
                        <i className="fas fa-user"></i> Login
                      </Nav.Link>

                      <Nav.Link
                        as={Link}
                        to="/signup"
                      >
                        <i className="fas fa-user"></i> Register
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
