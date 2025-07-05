import axios from "axios";

const API = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/signup", formData);

export const getOrgsForUser = (userId) =>
  API.get(`/user/${userId}/organisations`);

export const getOrgData = (orgId) => API.get(`/organisation/${orgId}`);

export const createOrg = (formData) => API.post(`/organisation`, formData);

export const createService = (formData) => API.post(`/service`, formData);
