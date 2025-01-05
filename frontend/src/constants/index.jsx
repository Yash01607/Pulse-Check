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
