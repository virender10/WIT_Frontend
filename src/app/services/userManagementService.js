import axios from "axios";
import config from ".";
import _ from "lodash";
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

const getFileObj = async (logo) => {
  if (logo) {
    // const serverFile = `http://23.96.87.60:3000/companies/${logo}`;
    const ext = logo.split(".");
    const response = await fetch(logo, {
      mode: "no-cors"
    });
    const data = await response.blob();
    let file = new File([data], logo, {
      type: `image/${ext[ext.length - 1]}`
    });
    return file;
  }
}

// userid: 45
// first_name: Test User
// last_name: Last Test
// email: neeraj1111@gmail.com
// role_id: 2
// role_type_name: 
// role_name: Admin
// company_id: 2
// companies_role_id: 2
// image: [object Object]
// permissions: 
// projects: 
// userType: company
// company: 2
// phone: 9478602223
// ctoken: 2
// comp_role_token: 2
// password: admin
// phone_code: 91

export async function updateUser(user) {
  const { userid, ...restData } = user;
  restData["phone_code"] = "91";
  restData["phone"] = "1234567890";
  restData["password"] = "admin";
  restData["status"] = 1;
  restData.image = await getFileObj(_.isObject(restData.image) ? restData.image.data : restData.image);
  const createUserData = convertToFormData(restData)
  return axios.put(API_URL+`user/edit?userid=${userid}`, createUserData);
}

export function getUsersList(offset, limit) {
//  const userList = convertToFormData({offset,limit} )
  return axios.get(API_URL+`user/listing?limit=${100}&offset=${0}`);
}

export function getUserCompaniesList() {
    return axios.get(API_URL+`user/companies-list`);
}
export function getUserCompaniesRoleList() {
  return axios.get(API_URL+`user/comp-roles-list`);
}

export function getUserById(id){
  console.log("id: ", id);
  
  return axios.get(API_URL+"/getprofile?userid=" +id);
}

export function deleteUserById(userId){
  return axios.delete(API_URL + "user/delete",{ data: { userid: userId } });
}

export function createUser(user){

  //Set static data beacuse api required these all fields,
  // user["password"] ="admin"
  // user["role_id"] ="1"
  // user["role_type_id"] ="1"
  // user["user_type"] ="A"
  user["phone_code"] = "91"

  const createUserData = convertToFormData(user)
  return axios.post(API_URL + "user/create", createUserData);
}
