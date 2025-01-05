import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./UserReducer";

const combinedReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default combinedReducers;
