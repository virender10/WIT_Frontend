import axios from "axios";
import { format } from "date-fns";

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

//This function data convert into formData
function convertToFormData(data){
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    formData.append(key, data[key]);
  })

  return formData;
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
  return axios.get(API_URL + ME_URL);
}

//API service
export function getRoles() {
  return axios.post(API_URL + "/role/getroles",{});
}

// custom mock Services

export function updateUser(user){

  //Set static data beacuse api required these all fields,
  user["password"] ="admin"  
  user["phone_code"] = "91"

  const updateData = convertToFormData(user)
  console.log("Update Data: ",updateData )
  return axios.post(API_URL + "/user/edit",updateData);

}

export function deleteUserById(userId){

  console.log("deleteUserId: ", userId)

  const deleteUserId = convertToFormData({"user_id":userId});  

  return axios.post(API_URL + "/user/delete",{deleteUserId});
}

export function saveUser(user){

  //Set static data beacuse api required these all fields,
  user["password"] ="admin"
  user["role_id"] ="1"
  user["role_type_id"] ="1"
  user["user_type"] ="A"
  user["phone_code"] = "91"

  const createUserData = convertToFormData(user)
  console.log(createUserData, "jgdsahfshaf")
  return axios.post(API_URL + "/user/create",createUserData);
}

// export function saveRole(roleTitle) {
//   return axios.post("api/auth/saveRole", { roleTitle });
// }

