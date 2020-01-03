import axios from "axios";
import config from "."
export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

// export const LOGIN_URL = "/user/login";
// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

const API_URL = `${config.baseUrl}`;

export const ME_URL = "api/me";

function convertToFormData(data){
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    formData.append(key, data[key]);
  })

  return formData;
}

export function updateUser(user) {
  const { userid, ...restData } = user;
  restData["phone_code"] = "91"
  restData["phone"] = "1234567890"
  restData["password"] = "admin"
  const createUserData = convertToFormData(restData)
  return axios.put(API_URL+`admin/editUser?userid=${userid}`, createUserData);
}

export function getUsersList(offset, limit) {
//  const userList = convertToFormData({offset,limit} )
  return axios.get(API_URL+`admin/listing?limit=${100}&offset=${0}`);
}

export function getUserById(id){
  console.log("id: ", id);
  
  return axios.get(API_URL+"/getprofile?userid=" +id);
}

export function deleteUserById(userId){
  return axios.delete(API_URL + "admin/deleteUser",{ data: { userid: userId } });
}

export function createUser(user){

  //Set static data beacuse api required these all fields,
  // user["password"] ="admin"
  // user["role_id"] ="1"
  // user["role_type_id"] ="1"
  // user["user_type"] ="A"
  user["phone_code"] = "91"

  const createUserData = convertToFormData(user)
  return axios.post(API_URL + "admin/createNewUser", createUserData);
}
