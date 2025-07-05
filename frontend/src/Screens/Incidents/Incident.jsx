import React from "react";

import { useParams } from "react-router-dom";

const IncidentScreen = () => {
  const { id: incidentId } = useParams();

  return <div>IncidentScreen</div>;
};

export default IncidentScreen;
