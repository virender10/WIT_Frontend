// import axios from "axios";
export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";
import config from "./index"


export function getRoles() {
  return axios.get(config.baseUrl, "role/getroles");
}

export function saveRole(roleTitle) {
  return axios.post("api/auth/saveRole", { roleTitle });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get("iii");
}
