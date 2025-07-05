import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrg, getOrgsForUser } from "../../actions/OrgActions";

import Message from "../../components/General/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [orgName, setOrgName] = useState("");

  const dropdownRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { data: userData } = userLogin;

  const userOrganisations = useSelector((state) => state.getOrgsForUser);
  const { data: organisations, error, loading } = userOrganisations;

  const createOrgState = useSelector((state) => state.createOrg);
  const {
    data: createOrgData,
    error: createOrgError,
    loading: createOrgLoading,
  } = createOrgState;

  useEffect(() => {
    if (userData?.id) {
      dispatch(getOrgsForUser(userData.id));
    }
    if (createOrgData?.id) {
      navigate(`/organisation/${createOrgData?.id}`);
    }
  }, [dispatch, userData, createOrgData, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateOrg = (e) => {
    e.preventDefault();
    if (orgName) {
      dispatch(
        createOrg({
          name: orgName,
          user_id: userData.id,
        })
      );
    }
  };

  return (
    <div className="container mt-4 text-light">
      {(loading || createOrgLoading) && <p>Loading...</p>}
      {error?.details && <Message error={true}>{error?.details}</Message>}
      {createOrgError?.details && (
        <Message error={true}>{error?.details}</Message>
      )}
      {!loading && !error && organisations && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2
              className="text-light"
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "0",
              }}
            >
              Your Organisations
            </h2>
            <div className="d-flex justify-content-between align-items-center">
              {isOpen ? (
                <div
                  ref={dropdownRef}
                  className="create-org-dropdown ms-3"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    padding: "15px 20px", // Increased padding for better visual
                    borderRadius: "8px",
                    transform: isOpen ? "translateX(0)" : "translateX(100%)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added subtle shadow
                    backgroundColor: "#343a40", // Dark background
                    display: "flex", // Align items in a row
                    alignItems: "center", // Vertically center content
                  }}
                >
                  <InputGroup style={{ width: "100%" }}>
                    <FormControl
                      placeholder="Enter organization name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      style={{
                        borderRadius: "8px", // Matching rounded corners
                        padding: "10px 15px", // More comfortable padding
                        border: "1px solid #495057", // Subtle border color
                        backgroundColor: "#495057", // Dark input background
                        color: "#fff", // White text for contrast
                        height: "100%", // Full height of the parent div
                      }}
                    />
                    <Button
                      variant="success"
                      onClick={handleCreateOrg}
                      style={{
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        fontSize: "1.1rem",
                        marginLeft: "10px",
                        height: "100%",
                      }}
                    >
                      Create
                    </Button>
                  </InputGroup>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    height: "50px", // Make button height same as input div
                    margin: "14px",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  Create Organization
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Summary Section */}
          <div className="row text-center mb-5">
            <div className="col-12 col-md-4">
              <div
                className="stat-box p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#343a40",
                  color: "#f8f9fa",
                  border: "2px solid #495057",
                }}
              >
                <h5 className="mb-0 text-info">Total Organizations</h5>
                <p className="mb-0 text-white fs-2">{organisations?.length}</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className="stat-box p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#343a40",
                  color: "#f8f9fa",
                  border: "2px solid #495057",
                }}
              >
                <h5 className="mb-0 text-info">Total Services Deployed</h5>
                <p className="mb-0 text-white fs-2">
                  {organisations?.reduce(
                    (acc, org) =>
                      acc +
                      org.operational_count +
                      org.degraded_count +
                      org.partial_outage_count +
                      org.major_outage_count,
                    0
                  )}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div
                className="stat-box p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#343a40",
                  color: "#f8f9fa",
                  border: "2px solid #495057",
                }}
              >
                <h5 className="mb-0 text-info">Active Services</h5>
                <p className="mb-0 text-white fs-2">
                  {organisations?.reduce(
                    (acc, org) => acc + org.operational_count,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          {organisations?.length > 0 ? (
            <div className="container border-bottom pb-2">
              {organisations?.map((org) => (
                <div
                  key={org.id}
                  className="row justify-content-between align-items-center border p-4 mb-4 rounded shadow-lg bg-dark"
                  style={{ backgroundColor: "#2b2d31" }}
                >
                  <div className="col-12 col-md-2 text-start mb-3 mb-md-0">
                    <h5 className="mb-0 text-light font-weight-bold">
                      {org.name}
                    </h5>
                  </div>

                  <div className="col-12 col-md-8 mb-3 mb-md-0">
                    <div
                      className="d-flex justify-content-between mb-3"
                      style={{
                        backgroundColor: "#343a40",
                        padding: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Operational Status */}
                      <div
                        className="status-box text-center d-flex align-items-center justify-content-center p-3"
                        style={{
                          backgroundColor: "#28a745", // Green for operational
                          color: "#fff",
                          flex: 1,
                          margin: "0 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{ fontWeight: "bold" }}
                        >
                          Operational ({org.operational_count})
                        </p>
                      </div>

                      {/* Degraded Performance Status */}
                      <div
                        className="status-box text-center d-flex align-items-center justify-content-center p-3"
                        style={{
                          backgroundColor: "#ffc107", // Yellow for degraded performance
                          color: "#343a40",
                          flex: 1,
                          margin: "0 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{ fontWeight: "bold" }}
                        >
                          Degraded Performance ({org.degraded_count})
                        </p>
                      </div>

                      {/* Partial Outage Status */}
                      <div
                        className="status-box text-center d-flex align-items-center justify-content-center p-3"
                        style={{
                          backgroundColor: "#dc3545", // Red for partial outage
                          color: "#fff",
                          flex: 1,
                          margin: "0 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{ fontWeight: "bold" }}
                        >
                          Partial Outage ({org.partial_outage_count})
                        </p>
                      </div>

                      {/* Major Outage Status */}
                      <div
                        className="status-box text-center d-flex align-items-center justify-content-center p-3"
                        style={{
                          backgroundColor: "#6c757d", // Dark gray for major outage
                          color: "#fff",
                          flex: 1,
                          margin: "0 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{ fontWeight: "bold" }}
                        >
                          Major Outage ({org.major_outage_count})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-2 text-end mb-3 mb-md-0">
                    <button
                      onClick={() => navigate(`/organisation/${org.id}`)}
                      className="btn btn-light w-100 py-2"
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      View Organisation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-light">No Organisations deployed.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
