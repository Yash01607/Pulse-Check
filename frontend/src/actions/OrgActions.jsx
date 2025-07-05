import * as api from "../api/index";
import { ORGANISATION } from "../constants/index.jsx";

export const getOrgsForUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ORGANISATION.LIST_FOR_USER.REQUEST,
    });

    const { data } = await api.getOrgsForUser(userId);

    dispatch({
      type: ORGANISATION.LIST_FOR_USER.SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data?.detail;
    dispatch({
      type: ORGANISATION.LIST_FOR_USER.FAILURE,
      payload: message,
    });
  }
};

export const getOrgData = (orgId) => async (dispatch) => {
  try {
    dispatch({
      type: ORGANISATION.ORG_DATA.REQUEST,
    });

    const { data } = await api.getOrgData(orgId);

    dispatch({
      type: ORGANISATION.ORG_DATA.SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data?.detail;
    dispatch({
      type: ORGANISATION.ORG_DATA.FAILURE,
      payload: message,
    });
  }
};

export const createOrg = (createOrgData) => async (dispatch) => {
  console.log(createOrgData);
  try {
    dispatch({
      type: ORGANISATION.CREATE.REQUEST,
    });

    const { data } = await api.createOrg(createOrgData);

    dispatch({
      type: ORGANISATION.CREATE.SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data?.detail;
    dispatch({
      type: ORGANISATION.CREATE.FAILURE,
      payload: message,
    });
  }
};
