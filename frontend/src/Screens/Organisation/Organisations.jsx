import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrgData } from "../../actions/OrgActions";
import { createService } from "../../actions/ServiceActions";
import Message from "../../components/General/Message";
import StatusBox from "../../components/General/StatusBox";
import ServiceStatusDropdown from "../../components/Service/ServiceStatusDropdown";

const OrganisationScreen = () => {
  const { id: orgId } = useParams();
  const dispatch = useDispatch();

  const [showIncidents, setShowIncidents] = useState({});
  const [serviceName, setServiceName] = useState("");
  const [serviceStatus, setServiceStatus] = useState("Operational");

  const getOrgDetails = useSelector((state) => state.getOrgData);
  const { data: orgData, loading, error } = getOrgDetails;

  const createServiceState = useSelector((state) => state.createService);
  const {
    data: createServiceData,
    loading: createServiceLoading,
    error: createServiceError,
  } = createServiceState;

  useEffect(() => {
    if (!orgData?.id || orgData?.id !== orgId) {
      dispatch(getOrgData(orgId));
    }

    if (
      createServiceData?.id &&
      !orgData?.services?.some(
        (service) => service.id === createServiceData?.id
      )
    ) {
      dispatch(getOrgData(orgId));
    }
  }, [dispatch, orgData, orgId, createServiceData]);

  const toggleIncidentsVisibility = (serviceId) => {
    setShowIncidents((prevState) => ({
      ...prevState,
      [serviceId]: !prevState[serviceId],
    }));
  };

  const getIncidentCountColor = (count) => {
    if (count === 0) {
      return "text-success";
    }
    if (count <= 5) {
      return "text-warning"; // Yellow for a few incidents
    }
    return "text-danger"; // Red for a high number of incidents
  };

  const handleCreateService = () => {
    if (serviceName && serviceStatus) {
      dispatch(
        createService({
          name: serviceName,
          status: serviceStatus,
          organization_id: orgId,
        })
      );
    } else {
      alert("Please provide both service name and status.");
    }
  };

  return (
    <div className="container mt-4 text-light">
      {(loading || createServiceLoading) && <p>Loading...</p>}
      {error?.details && <Message error={true}>{error?.details}</Message>}
      {createServiceError?.details && (
        <Message error={true}>{error?.createServiceError}</Message>
      )}
      {createServiceData?.id && (
        <Message success={true}>Service Created Successfully</Message>
      )}
      {orgData && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">{orgData?.name}</h1>

            <div className="d-flex align-items-center">
              <i className="fas fa-link me-2"></i> {/* Link icon */}
              <span
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="text-light"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title="Click to copy the link"
              >
                {window.location.href}
              </span>
            </div>
          </div>
          <div className="container border-bottom pb-2">
            <div
              key={"Create Service"}
              className="row align-items-center border p-3 mb-4 rounded shadow-sm bg-dark"
            >
              <div className="col-12 col-md-8 d-flex align-items-center">
                <InputGroup style={{ width: "100%" }}>
                  <FormControl
                    placeholder="Enter service name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)} // Add state to track name
                    style={{
                      borderRadius: "8px", // Matching rounded corners
                      padding: "10px 15px", // More comfortable padding
                      border: "1px solid #495057", // Subtle border color
                      backgroundColor: "#6c757d", // bg-secondary equivalent
                      color: "#fff",
                      height: "100%",
                    }}
                  />
                  <ServiceStatusDropdown
                    value={serviceStatus}
                    onChange={(e) => setServiceStatus(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="col-12 col-md-4 text-end">
                <Button
                  variant="success"
                  onClick={handleCreateService}
                  style={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    fontSize: "1.1rem",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  Create Service
                </Button>
              </div>
            </div>

            {orgData?.services?.length > 0 ? (
              orgData?.services?.map((service) => (
                <div
                  key={service.id}
                  className="row align-items-center border p-3 mb-4 rounded shadow-sm bg-dark"
                >
                  <div className="col-12 col-md-3 text-start mb-3 mb-md-0">
                    <h5 className="mb-0 text-light">{service.name}</h5>
                  </div>
                  <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
                    <StatusBox status={service.status} />
                  </div>
                  <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                    <div
                      className="incident-count-box p-3 rounded shadow-sm"
                      style={{
                        backgroundColor: "#343a40", // Light black background
                        color: "#f8f9fa", // Light text color
                      }}
                    >
                      <p className="mb-0">
                        <strong>Incidents Count:</strong>
                        <span
                          className={`ms-2 ${getIncidentCountColor(service.incidents?.length || 0)}`}
                        >
                          {service.incidents?.length || 0}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 text-end mb-3 mb-md-0">
                    <button
                      onClick={() => toggleIncidentsVisibility(service.id)}
                      className="btn btn-primary w-100"
                    >
                      {showIncidents[service.id]
                        ? "Hide Incidents"
                        : "View Incidents"}
                    </button>
                  </div>
                  {showIncidents[service.id] && (
                    <div className="col-12 mt-3">
                      <div className="incident-list p-4 border rounded shadow-sm bg-dark">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="text-light mb-0 fw-bold">
                            Incidents:
                          </h6>
                          <span className="text-light">
                            {service.incidents?.length} Incident
                            {service.incidents?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        {service.incidents?.length > 0 ? (
                          <ul className="list-unstyled mb-0 text-light">
                            {service.incidents.map((incident) => (
                              <li
                                key={incident.id}
                                className="incident-item border-bottom pb-3 mb-3"
                              >
                                <div className="d-flex justify-content-between align-items-start">
                                  <h6 className="mb-1 text-primary">
                                    {incident.title}
                                  </h6>
                                  <StatusBox status={incident.status} />
                                </div>
                                <p className="text-light">
                                  {incident.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-light">No incidents reported.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-light">No Services deployed.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrganisationScreen;
