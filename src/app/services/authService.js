import axios from "axios";

// export const LOGIN_URL = "api/auth/login";
// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
// export const ME_URL = "api/me";
// const API_URL = process.env.API_HOST_URL || '';
export const LOGIN_URL = "/user/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

const API_URL = "http://23.96.87.60:3000";

export const ME_URL = "/user/token_details";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export function login(email, password) {
  return axios.post(API_URL + LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(API_URL + REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(API_URL + REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(API_URL + ME_URL);
}

//API service
export function getRoles() {
  return axios.post(API_URL + "/role/getroles",{});
}

// custom mock Services

export function updateUser(user){
  return axios.post("api/auth/updateUser",{user});
}

// export function deleteUserById(userId){
//   return axios.post("api/auth/deleteUser",{userId});
// }

export function saveUser(user){
  return axios.post("api/auth/saveUser",{user});
}

// export function saveRole(roleTitle) {
//   return axios.post("api/auth/saveRole", { roleTitle });
// }

