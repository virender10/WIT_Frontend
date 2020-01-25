import axios from "axios";
import config from ".";

const API_URL = `${config.baseUrl}`;

function convertToFormData(data){
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    formData.append(`formvalue[${key}]`, data[key]);
  })

  return formData;
}

export function addField(fieldData) {
// field_name	Gender
// step_token	1
// field_label	Gender
// data_type	array
// option_list[0]	Male
// option_list[1]	Female
// option_list[2]	Other
  const fieldFormData = convertToFormData(fieldData);
  return axios.post(API_URL + `data_manage/add-field`, fieldFormData);
}

export function getFormStepsList() {
  return axios.get(API_URL+`data_manage/formsteps-list`);
}

export function getFormFieldList(stepToken) {
  return axios.get(API_URL+`data_manage/formsteps-fields-list?stepstoken=${stepToken}`);
}

export function saveFormData(formData) {
  const formFieldData = convertToFormData(formData);
  return axios.post(API_URL+'data_manage/save-formdata', formFieldData);
}

export function listingFillupForm() {
  return axios.get(API_URL+'data_manage/listing-formdata');
}