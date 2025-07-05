import { combineReducers } from "redux";
import {
  createOrgReducer,
  createServiceReducer,
  getOrgDataReducer,
  getOrgsForUserReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./Reducer";

const combinedReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getOrgsForUser: getOrgsForUserReducer,
  getOrgData: getOrgDataReducer,
  createOrg: createOrgReducer,
  createService: createServiceReducer,
});

export default combinedReducers;
