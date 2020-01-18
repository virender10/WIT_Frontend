import axios from "axios";
import config from "."
export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

// export const LOGIN_URL = "/user/login";
// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

const API_URL = `${config.baseUrl}`;

function convertToFormData(data){
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    formData.append(key, data[key]);
  })

  return formData;
}

export function updateCompany(company) {
  const { id, ...restData } = company;
  const updateCompanyData = convertToFormData(restData);
  return axios.put(API_URL + `company/edit?ctoken=${id}`, updateCompanyData);
}

export function getCompaniesList(offset, limit) {
//  const userList = convertToFormData({offset,limit} )
  return axios.get(API_URL+`company/listing?limit=${limit}&offset=${offset}`);
}

export function updateCompanyLogo(company) {
  const updateCompanyData = convertToFormData(company)
  return axios.put(API_URL+`company/change-logo`, updateCompanyData);
}

export function changeCompanyStatus(company) {
  const changeCompanyData = convertToFormData(company)
  return axios.put(API_URL+`company/block-unblock`, changeCompanyData);
}

// export function getUserById(id){
//   console.log("id: ", id);
  
//   return axios.get(API_URL+"/getprofile?userid=" +id);
// }

// export function deleteUserById(userId){
//   return axios.delete(API_URL + "admin/deleteUser",{ data: { userid: userId } });
// }

export function createCompany(company){

  //Set static data beacuse api required these all fields,
  // user["password"] ="admin"
  // user["role_id"] ="1"
  // user["role_type_id"] ="1"
  // user["user_type"] ="A"
//   user["phone_code"] = "91"

  const createCompanyData = convertToFormData(company)
  return axios.post(API_URL + "company/create", createCompanyData);
}
