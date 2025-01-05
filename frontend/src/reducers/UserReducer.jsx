import { USER } from "../constants/index.jsx";

const createReducer = (
  actionTypes,
  initialState = {
    loading: false,
    data: undefined,
    error: undefined,
  }
) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.REQUEST:
        return { ...state, loading: true };

      case actionTypes.SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: undefined,
        };

      case actionTypes.FAILURE:
        return { ...state, loading: false, error: action.payload };

      case actionTypes.RESET:
        return { ...state, data: undefined, error: undefined };

      default:
        return state;
    }
  };
};

export const userLoginReducer = createReducer(USER.LOGIN);
export const userRegisterReducer = createReducer(USER.REGISTER);
export const userLogoutReducer = createReducer(USER.LOGOUT);
