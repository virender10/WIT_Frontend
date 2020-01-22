import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../services/authService";
import { createUser, getUsersList, deleteUserById, updateUser } from "../../services/userManagementService";
import * as routerHelpers from "../../router/RouterHelpers";
import { userRoleActions, roleActions } from "./role.duck";
import { ROLES } from "../../constants"

export const actionTypes = {
  CreateUser: "[Create User] Action",
  SetCurrentUser: "[Set Create User] Action",
  CreateUserSuccess: "[Create User Success] Action",
  EditUser: "[Edit User] Action",
  EditUserSuccess: "[Edit User Success] Action",
  DeleteUser: "[Delete User] Action",
  DeleteUserSuccess: "[Delete User Success] Action",
  GetUserList: "[Get User List] Action",
  GetUserListSuccess: "[Get User List Success] Action",
  GetUserRoles: "[Get User Roles] Action",
  ...userRoleActions
};

const initialAuthState = {
  userList: [],
  currentUser: undefined,
  roles: []
};

export const reducer = persistReducer(
  { storage, key: "welltech- users", whitelist: ["userList", "currentUser", "role"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.CreateUserSuccess: {
        const { user } = action.payload;
        const users = [...state.userList];
        users.push(user)
        return { ...state, currentUser: undefined, userList: users };
      }
      case actionTypes.SetCurrentUser: {
        const { values } = action.payload;
        const obj = { ...state.currentUser, ...values, file: values.file }
        return { ...state, currentUser: obj };
      }

      case actionTypes.EditUserSuccess: {
        const { userid, ...restData } = action.payload;
        const users = [...state.userList];
            const selectedUserIndex = users.findIndex(user => user.userid === userid);
            if (selectedUserIndex > -1) {
                users.splice(selectedUserIndex, 1, {
                    ...users[selectedUserIndex],
                    ...restData
                })
            }
            return { ...state,  userList: users };
      }

      case actionTypes.DeleteUserSuccess: {
        const { userid } = action.payload;
        const users = [...state.userList];
            const selectedUserIndex = users.findIndex(user => user.userid === userid);
            if (selectedUserIndex > -1) {
                users.splice(selectedUserIndex, 1)
            }
            return { ...state, userList: users };
      }

      case actionTypes.GetUserListSuccess: {
        const { users } = action.payload;
        return { ...state, userList: users };
      }
      case actionTypes.AddRoleSuccess: {
        const { role } = action.payload;
        const roles = [...state.roles];
        if (roles && roles.length > 0) {
          const sortedRoles = roles.slice().sort((a, b) => b.id - a.id)
          role.id = sortedRoles[0].id + 1;
        }
        roles.push(role)
        return { ...state, roles };
      }

      case actionTypes.EditRoleSuccess: {
        const { id, ...restData } = action.payload;
        const roles = [...state.roles];
            const selectedRoleIndex = roles.findIndex(role => role.id === id);
        if (selectedRoleIndex > -1) {
                roles.splice(selectedRoleIndex, 1)
                roles.splice(selectedRoleIndex, 0, {
                  id,
                  ...restData,
                })
            }
            return { ...state, roles };
      }

      case actionTypes.DeleteRoleSuccess: {
        const { id } = action.payload;
        const roles = [...state.roles];
            const selectedRoleIndex = roles.findIndex(role => role.id === id);
            if (selectedRoleIndex > -1) {
                roles.splice(selectedRoleIndex, 1)
            }
            return { ...state, roles };
      }

      case actionTypes.GetUserRolesSuccess: {
        const { roles } = action.payload;
        return { ...state, roles };
      }

      default:
        return state
    }
  }
);

export const actions = {
  setCurrentUser: values => ({ type: actionTypes.SetCurrentUser, payload: { values } }),
  createUser: data => ({ type: actionTypes.CreateUser, payload: { data } }),
  createUserSuccess: user => ({ type: actionTypes.CreateUserSuccess, payload: { user } }),
  editUser: data => ({
    type: actionTypes.EditUser,
    payload: { data }
  }),
  editUserSuccess: user => ({
    type: actionTypes.EditUserSuccess,
    payload: { user }
  }),
  deleteUser: id => ({ type: actionTypes.DeleteUser, payload: { id } }),
  deleteUserSuccess: userid => ({ type: actionTypes.DeleteUserSuccess, payload: { userid } }),
  getUserList: () => ({ type: actionTypes.GetUserList, payload: { } }),
  getUserListSuccess: (users) => ({ type: actionTypes.GetUserListSuccess, payload: users }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  ...roleActions
};

export function* saga() {
  yield takeLatest(actionTypes.CreateUser, function* createUserSaga({payload}) {
    const { data } = payload;
    const { values: user, callback } = data;
    const { companyName, role, file, user_management, data_management, ...restUserData } = user;
    const userData = {
      ...restUserData,
      role_id: role,
      image: file
    }
    yield createUser(userData)
    callback();
    yield put(actions.createUserSuccess(user));
  });
  yield takeLatest(actionTypes.EditUser, function* createUserSaga({payload}) {
    const { data } = payload;
    const { values: user, callback } = data;
    const { companyName, role, file, user_management, data_management, ...restUserData } = user;
    const userData = {
      ...restUserData,
      role_id: role,
      image: file
    }
    yield updateUser(userData)
    callback();
    yield put(actions.editUserSuccess(user));
  });

  yield takeLatest(actionTypes.GetUserList, function* getUserListSaga() {
    const response = yield getUsersList();
    yield put(actions.getUserListSuccess({users: response.data.data ? response.data.data.items : [] }));
  });

  yield takeLatest(actionTypes.DeleteUser, function* getUserListSaga({ payload }) {
    const { id } = payload;
    const response = yield deleteUserById(id);
    yield put(actions.deleteUserSuccess(id));
  });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();
  //   // debugger
  //   console.log(user.userdata);
  //   yield put(actions.fulfillUser(user.userdata));
  // });
}
