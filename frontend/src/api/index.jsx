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
