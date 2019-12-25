import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

// export const LOGIN_URL = "/user/login";
// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

const API_URL = "http://23.96.87.60:3000/user";

export const ME_URL = "api/me";

function convertToFormData(data){
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    formData.append(key, data[key]);
  })

  return formData;
}

export function updateUser(userid,first_name,last_name,phone) {
  return axios.post(API_URL+"/editprofile",{userid,first_name,last_name,phone});
}


export function getUsersList(offset, limit) {
//  const userList = convertToFormData({offset,limit} )
  return axios.get(API_URL+`/listing?limit=${10}&offset=${0}`);
}

export function getUserById(id){
  console.log("id: ", id);
  
  return axios.get(API_URL+"/getprofile?userid=" +id);
}

