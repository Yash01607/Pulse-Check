import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrgsForUser } from "../../actions/OrgActions";
import { logout } from "../../actions/UserAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { data: userData } = userLogin;

  useEffect(() => {
    if (userData?.id) {
      dispatch(getOrgsForUser(userData.id));
    }
  }, [dispatch, userData]);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <header
      style={{
        backgroundColor: "#212529", // Dark background
        padding: "25px 0",
        borderBottom: "2px solid #6c757d",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          className="d-flex align-items-center text-light"
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          <h1 className="mb-0">Pulse Check</h1>
        </Link>

        <div
          className="d-flex align-items-center"
          style={{ fontSize: "1.1rem", gap: "1.5rem" }}
        >
          {userData ? (
            <>
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#495057",
                    color: "#f8f9fa",
                    border: "none",
                    fontSize: "1.1rem",
                    width: "100%", // Make sure the button takes the full width
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#f8f9fa",
                      color: "#495057",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {userData.name
                      .split(" ")
                      .map((name) => name[0].toUpperCase())
                      .join("")}
                  </div>

                  {userData.name}
                </button>
                <ul
                  className="dropdown-menu"
                  style={{
                    backgroundColor: "#343a40",
                    width: "100%", // Make the dropdown menu same width as the button
                  }}
                >
                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item text-light"
                      style={{
                        padding: "10px 20px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  {userData?.isAdmin && (
                    <li>
                      <Link
                        to="/allOrders"
                        className="dropdown-item text-light"
                        style={{
                          padding: "10px 20px",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        Manage Services
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="dropdown-item text-light"
                      style={{
                        padding: "10px 20px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-light mx-2"
                style={{ transition: "all 0.3s ease-in-out", fontSize: "1rem" }}
              >
                <i className="fas fa-user"></i> Login
              </Link>

              <Link
                to="/signup"
                className="text-light mx-2"
                style={{ transition: "all 0.3s ease-in-out", fontSize: "1rem" }}
              >
                <i className="fas fa-user"></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
