import { put, takeLatest } from "redux-saga/effects";
import { getRoles } from "../../services/authService";

export const userRoleActions = {
    AddRole: "[Add Role] Action",
    AddRoleSuccess: "[Add Role Success] Action",
    EditRole: "[Edit Role] Action",
    EditRoleSuccess: "[Edit Role Success] Action",
    DeleteRole: "[Delete Role] Action",
    DeleteRoleSuccess: "[Delete Role Success] Action",
    GetUserRolesSuccess: "[Get User Roles Success] Action",
    GetUserRoles: "[Get User Roles] Action"
}

export const roleActions =  {
  addRole: data => ({ type: userRoleActions.AddRole, payload: { data } }),
  addRoleSuccess: role => ({ type: userRoleActions.AddRoleSuccess, payload: { role } }),
  editRole: data => ({
    type: userRoleActions.EditRole,
    payload: { data }
  }),
  editRoleSuccess: role => ({
    type: userRoleActions.EditRoleSuccess,
    payload: role
  }),
  deleteRole: id => ({ type: userRoleActions.DeleteRole, payload: id }),
  deleteRoleSuccess: id => ({ type: userRoleActions.DeleteRoleSuccess, payload: { id } }),
  getUserRole: () => ({ type: userRoleActions.GetUserRoles, payload: { } }),
  getUserRoleSuccess: (roles) => ({ type: userRoleActions.GetUserRolesSuccess, payload: roles }),
};

export function* saga() {
    yield takeLatest(userRoleActions.AddRole, function* addRoleSaga({payload}) {
      const { data } = payload;
    //   const { values: user, callback } = data;
    //   const { companyName, role, file, user_management, data_management, ...restUserData } = user;
    //   const userData = {
    //     ...restUserData,
    //     role_id: role,
    //     image: file
    //   }
    //   yield createUser(userData)
    //   callback();
      yield put(roleActions.addRoleSuccess(data));
    });
    yield takeLatest(userRoleActions.EditRole, function* editRoleSaga({payload}) {
      const { data } = payload;
    //   const { values: user, callback } = data;
    //   const { companyName, role, file, user_management, data_management, ...restUserData } = user;
    //   const userData = {
    //     ...restUserData,
    //     role_id: role,
    //     image: file
    //   }
    //   yield updateUser(userData)
    //   callback();
      yield put(roleActions.editRoleSuccess(data));
    });
  
    yield takeLatest(userRoleActions.GetUserRoles, function* getUserRoleSaga() {
      const response = yield getRoles();
      yield put(roleActions.getUserRoleSuccess({ roles: response.data ? response.data.data.items : [] }));
    });
  
    yield takeLatest(userRoleActions.DeleteRole, function* deleteRoleSaga({ payload }) {
      const { id } = payload;
    //   const response = yield deleteUserById(id);
      yield put(roleActions.deleteRoleSuccess(id));
    });
  }