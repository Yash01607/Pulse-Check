import { ORGANISATION, SERVICE, USER } from "../constants/index.jsx";
import createReducer from "./CommonReducer.jsx";

export const userLoginReducer = createReducer(USER.LOGIN, {
  loading: false,
  data: JSON.parse(localStorage.getItem("userInfo")) || undefined,
  error: undefined,
});
export const userRegisterReducer = createReducer(USER.REGISTER);
export const userLogoutReducer = createReducer(USER.LOGOUT);

export const getOrgsForUserReducer = createReducer(ORGANISATION.LIST_FOR_USER);
export const getOrgDataReducer = createReducer(ORGANISATION.ORG_DATA);
export const createOrgReducer = createReducer(ORGANISATION.CREATE);

export const createServiceReducer = createReducer(SERVICE.CREATE);
