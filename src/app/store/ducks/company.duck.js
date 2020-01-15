import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { createCompany } from "../../services/companyManagementService";

export const actionTypes = {
  CreateCompany: "[Create Company] Action",
  SetCurrentCompany: "[Set Create Company] Action",
  CreateCompanySuccess: "[Create Company Success] Action",
  EditCompany: "[Edit Company] Action",
  EditCompanySuccess: "[Edit Company Success] Action",
  DeleteCompany: "[Delete Company] Action",
  DeleteCompanySuccess: "[Delete Company Success] Action",
  GetCompanyList: "[Get Company List] Action",
  GetCompanyListSuccess: "[Get Company List Success] Action",
};

const initialAuthState = {
  companyList: [],
  currentCompany: undefined,
  roles: []
};;

export const reducer = persistReducer(
  { storage, key: "welltech- users", whitelist: ["companyList", "currentCompany", "role"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.CreateCompanySuccess: {
        const { company } = action.payload;
        const companies = [...state.companyList];
        if (companies && companies.length > 0) {
          const sortedCompanies = companies.slice().sort((a, b) => b.id - a.id)
          company.id = (sortedCompanies[0].id || 0) + 1;
        } else {
            company.id = 1;
        }
        companies.push(company)
        return { currentCompany: undefined, companyList: companies };
      }
      case actionTypes.SetCurrentCompany: {
        const { values } = action.payload;
        const obj = { ...state.currentCompany, ...values }
        return { ...state, currentCompany: obj };
      }

      case actionTypes.EditCompanySuccess: {
        const { companyId, ...restData } = action.payload;
        const companies = [...state.companyList];
            const selectedCompanyIndex = companies.findIndex(c => c.id === Number(companyId));
            if (selectedCompanyIndex > -1) {
                companies.splice(selectedCompanyIndex, 1, {
                    ...companies[selectedCompanyIndex],
                    ...restData
                })
            }
            return { ...state,  companyList: companies };
      }

      case actionTypes.DeleteCompanySuccess: {
        const { companyid } = action.payload;
        const companies = [...state.companyList];
            const selectedCompanyIndex = companies.findIndex(c => c.companyid === companyid);
            if (selectedCompanyIndex > -1) {
                companies.splice(selectedCompanyIndex, 1)
            }
            return { ...state, companyList: companies };
      }

      case actionTypes.GetCompanyListSuccess: {
        const { companies } = action.payload;
        return { ...state, companyList: companies };
      }

      default:
        return state
    }
  }
);

export const actions = {
  setCurrentCompany: values => ({ type: actionTypes.SetCurrentCompany, payload: { values } }),
  createCompany: data => ({ type: actionTypes.CreateCompany, payload: { data } }),
  createCompanySuccess: company => ({ type: actionTypes.CreateCompanySuccess, payload: { company } }),
  editCompany: data => ({
    type: actionTypes.EditCompany,
    payload: { data }
  }),
  editCompanySuccess: company => ({
    type: actionTypes.EditCompanySuccess,
    payload: company
  }),
  deleteCompany: id => ({ type: actionTypes.DeleteCompany, payload: { id } }),
  deleteCompanySuccess: companyid => ({ type: actionTypes.DeleteCompanySuccess, payload: companyid }),
  getCompanyList: () => ({ type: actionTypes.GetCompanyList, payload: { } }),
  getCompanyListSuccess: (companies) => ({ type: actionTypes.GetCompanyListSuccess, payload: companies }),
};

export function* saga() {
  yield takeLatest(actionTypes.CreateCompany, function* createCompanySaga({payload}) {
    const { data } = payload;
    const { values: company, callback } = data;
    const { name, description } = company;
    const companyData = {
        name,
        description
    }
      const response = yield createCompany(companyData);
    callback();
    yield put(actions.createCompanySuccess(company));
  });
  yield takeLatest(actionTypes.EditCompany, function* createCompanySaga({payload}) {
    const { data } = payload;
    const { values: company, callback } = data;
    // const { companyName, role, file, user_management, data_management, ...restCompanyData } = user;
    // const userData = {
    //   ...restUserData,
    //   role_id: role,
    //   image: file
    // }
    // yield updateUser(userData)
    callback();
    yield put(actions.editCompanySuccess(company));
  });

  yield takeLatest(actionTypes.GetCompanyList, function* getCompanyListSaga() {
    // const response = yield getCompanysList();
    // yield put(actions.getCompanyListSuccess({users: response.data.data.items}));
  });

  yield takeLatest(actionTypes.DeleteCompany, function* getCompanyListSaga({ payload }) {
    const { id } = payload;
    // const response = yield deleteCompanyById(id);
    yield put(actions.deleteCompanySuccess(id));
  });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();
  //   debugger
  //   console.log(user.userdata);
  //   yield put(actions.fulfillUser(user.userdata));
  // });
}
