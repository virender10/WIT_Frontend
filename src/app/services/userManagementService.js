import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

// export const LOGIN_URL = "/user/login";
// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

const API_URL = "http://23.96.87.60:3000/user";

export const ME_URL = "api/me";

export function updateUser(userid,first_name,last_name,phone) {
  return axios.post(API_URL+"/editprofile",{userid,first_name,last_name,phone});
}

export function getUsersList(offset,limit) {
  debugger
  return axios.post(API_URL+"/listing",{offset,limit});
}

export function getUserById(id){
  debugger
  return axios.post(API_URL+"/getprofile",{id});
}

// export function getUsers() {
//   return axios.get("api/auth/getusers");
// }

// export function getUserById(userId){
//   return axios.post("api/auth/getusersById",{userId});
// }

// export function updateUser(user){
//   return axios.post("api/auth/updateUser",{user});
// }

// export function deleteUserById(userId){
//   return axios.post("api/auth/deleteUser",{userId});
// }

// export function saveUser(user){
//   return axios.post("api/auth/saveUser",{user});
// }

// export function requestPassword(email) {
//   return axios.post(REQUEST_PASSWORD_URL, { email });
// }

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get('kkk');
// }
