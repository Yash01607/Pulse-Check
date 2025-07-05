import * as api from "../api/index";
import { SERVICE } from "../constants/index.jsx";

export const createService = (createServiceData) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICE.CREATE.REQUEST,
    });

    const { data } = await api.createService(createServiceData);

    dispatch({
      type: SERVICE.CREATE.SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data?.detail;
    dispatch({
      type: SERVICE.CREATE.FAILURE,
      payload: message,
    });
  }
};
