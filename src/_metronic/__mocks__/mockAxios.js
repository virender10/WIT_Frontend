import MockAdapter from "axios-mock-adapter";
import mockAuth from "./mockAuth";
//import _mockAuth from "../../../src/app/mockServices/_mockAuth";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios);

  mockAuth(mock);
  return mock;
}