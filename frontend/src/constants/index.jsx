const createActionTypes = (baseAction) => ({
  REQUEST: `${baseAction}_REQUEST`,
  SUCCESS: `${baseAction}_SUCCESS`,
  FAILURE: `${baseAction}_FAILURE`,
  RESET: `${baseAction}_RESET`,
});

export const USER = {
  LOGIN: createActionTypes("LOGIN"),
  LOGOUT: createActionTypes("LOGOUT"),
  REGISTER: createActionTypes("REGISTER"),
};

export const ORGANISATION = {
  LIST_FOR_USER: createActionTypes("LIST_FOR_USER"),
  ORG_DATA: createActionTypes("ORG_DATA"),
  CREATE: createActionTypes("CREATE"),
};

export const SERVICE = {
  CREATE: createActionTypes("CREATE"),
};

export const INCIDENT_STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};
