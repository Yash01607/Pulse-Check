import * as api from "../api/index";
import { USER } from "../constants/index.jsx";

export const login = (userData) => async (dispatch) => {
  try {
    // dispatch action to initiate login
    dispatch({
      type: USER.LOGIN.REQUEST,
    });

    // making the request using axios
    const { data } = await api.signIn(userData);

    // if successful, dispatch success and send data to reducer
    dispatch({
      type: USER.LOGIN.SUCCESS,
      payload: data,
    });

    // store user details in local Storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // if request not successful initiate error and send error data to reducer
    const message = error?.response?.data?.detail;

    dispatch({
      type: USER.LOGIN.FAILURE,
      payload: message,
    });
  }
};

export const register = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: USER.REGISTER.REQUEST,
    });

    console.log("iin actions");

    console.log(userData);

    const { data } = await api.register(userData);

    dispatch({
      type: USER.REGISTER.SUCCESS,
      payload: data,
    });
    navigate("/login");
  } catch (error) {
    dispatch({
      type: USER.REGISTER.FAILURE,
      payload: error?.response?.data?.detail,
    });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER.LOGOUT.REQUEST });

    dispatch({ type: USER.LOGOUT.SUCCESS, payload: {} });
    dispatch({ type: USER.REGISTER.RESET });
    dispatch({ type: USER.LOGIN.RESET });

    localStorage.clear();
    navigate("/");
    window.location.reload();
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: USER.LOGOUT.FAILURE,
      payload: message,
    });
  }
};
