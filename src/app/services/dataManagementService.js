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
  return axios.post(API_URL + `data_manage/add-field`, fieldData);
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