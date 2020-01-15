import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as users from "./ducks/user.duck";
import * as roles from "./ducks/role.duck";
import * as companies from "./ducks/company.duck";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  users: users.reducer,
  companies: companies.reducer
});

export function* rootSaga() {
  yield all([auth.saga(), users.saga(), roles.saga(), companies.saga()]);
}
