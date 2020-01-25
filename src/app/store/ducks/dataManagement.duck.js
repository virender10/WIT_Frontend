import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { put, takeLatest } from 'redux-saga/effects';
import {
  getFormFieldList,
  getFormStepsList,
  saveFormData,
  addField,
  listingFillupForm
} from '../../services/dataManagementService';
import { ROLES } from '../../constants';

export const actionTypes = {
  SetDataManagementSteps: "[Set Data Management Steps] Action",
  AddField: '[Add Field] Action',
  AddFieldSuccess: '[Add Field Success] Action',
  GetFormField: '[Get Form Field] Action',
  GetFormFieldSuccess: '[Get Form Field Success] Action',
  GetFormSteps: '[Get Form Steps] Action',
  GetFormStepsSuccess: '[Get Form Steps Success] Action',
  SaveFormData: '[Save Form Data] Action',
  SaveFormDataSuccess: '[Save Form Data Success] Action',
  ListingFillupForm: '[Listing Fill Form] Action',
  ListingFillupFormSuccess: '[Listing Fill Form Success] Action'
};

const initialAuthState = {
  steps: {},
  currentDataManagementSteps: {},
};

export const reducer = persistReducer(
  { storage, key: 'welltech- data-management', whitelist: ['steps', 'currentDataManagementSteps'] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.SetDataManagementSteps: {
        const { data } = action.payload;
        return {
          ...state,
          currentDataManagementSteps: {
            ...data
          }
        };
      }
      case actionTypes.AddFieldSuccess: {
        const { data } = action.payload;
        const { step_token: activeStep, ...restData } = data;
        const steps = { ...state.steps };
        if (steps[activeStep] && steps[activeStep].fields) {
          const stepFields = steps[activeStep].fields;
          if (!stepFields.find(field => field.name === data.name))
            stepFields.push(restData);
          steps[activeStep].fields = stepFields;
        } else {
          steps[activeStep] = {
            ...steps[activeStep],
            fields: [restData]
          };
        }
        return { ...state, steps };
      }
      case actionTypes.GetFormFieldSuccess: {
        const { fields } = action.payload;
        const steps = { ...state.steps };
        fields.forEach(f => {
          if (
            f.formstep_id &&
            steps[f.formstep_id] &&
            steps[f.formstep_id].fields
          ) {
            const stepFields = steps[f.formstep_id].fields;
            if (!stepFields.find(field => field.name === f.name))
              stepFields.push(f);
          } else {
            steps[f.formstep_id] = {
              ...steps[f.formstep_id],
              fields: [f]
            };
          }
        });
        return { ...state, steps };
      }

      case actionTypes.GetFormStepsSuccess: {
        const { steps } = action.payload;
        const obj = {};
        steps.forEach(s => {
          if (!obj[s.id]) {
            obj[s.id] = { name: s.name };
          }
        });
        return { ...state, steps: obj };
      }

      case actionTypes.SaveFormDataSuccess: {
        const { userid } = action.payload;
        const users = [...state.userList];
        const selectedUserIndex = users.findIndex(
          user => user.userid === userid
        );
        if (selectedUserIndex > -1) {
          users.splice(selectedUserIndex, 1);
        }
        return { ...state, userList: users };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setDataManagementSteps: data => ({ type: actionTypes.SetDataManagementSteps, payload: { data } }),
  addField: data => ({ type: actionTypes.AddField, payload: { data } }),
  addFieldSuccess: data => ({
    type: actionTypes.AddFieldSuccess,
    payload: { data }
  }),
  getFormField: step => ({ type: actionTypes.GetFormField, payload: { step } }),
  getFormFieldSuccess: fields => ({
    type: actionTypes.GetFormFieldSuccess,
    payload: { fields }
  }),
  saveFormData: () => ({
    type: actionTypes.SaveFormData
  }),
  saveFormDataSuccess: steps => ({
    type: actionTypes.SaveFormDataSuccess,
    payload: { steps }
  }),
  getFormSteps: userid => ({
    type: actionTypes.GetFormSteps,
    payload: { userid }
  }),
  getFormStepSuccess: steps => ({
    type: actionTypes.GetFormStepsSuccess,
    payload: { steps }
  }),
  listingFormFields: () => ({
    type: actionTypes.ListingFillupForm,
    payload: {}
  }),
  listingFormFieldsSuccess: fields => ({
    type: actionTypes.ListingFillupFormSuccess,
    payload: { fields }
  })
};

export function* saga() {
  yield takeLatest(actionTypes.AddField, function* addFieldSaga({ payload }) {
    const { data } = payload;
    const { field_name, field_label, ...restData } = data;
    // const { companyName, role, file, user_management, data_management, ...restUserData } = user;
    // const userData = {
    //   ...restUserData,
    //   role_id: role,
    //   image: file
    // }
    yield put(
      actions.addFieldSuccess({
        name: field_name,
        label: field_label,
        ...restData
      })
    );
  });
  yield takeLatest(actionTypes.GetFormField, function* createUserSaga({
    payload
  }) {
    const { step } = payload;
    // const response = yield getFormFieldList(step);
    // yield put(actions.getFormFieldSuccess(response.data.data.items));
  });

  yield takeLatest(actionTypes.GetFormSteps, function* getUserListSaga() {
    const response = yield getFormStepsList();
    yield put(actions.getFormStepSuccess(response.data.data.items));
  });

  yield takeLatest(actionTypes.SaveFormData, function* getUserListSaga({
    payload
  }) {
    // const { id } = payload;
    const response = yield saveFormData();
    yield put(actions.saveFormDataSuccess());
  });

  yield takeLatest(actionTypes.ListingFillupForm, function* getUserListSaga() {
    const response = yield listingFillupForm();
    console.log(response, "responseresponseresponse");
    // yield put(actions.listingFormFieldsSuccess());
  });
  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();
  //   // debugger
  //   console.log(user.userdata);
  //   yield put(actions.fulfillUser(user.userdata));
  // });
}
