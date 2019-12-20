import {
  LOGIN_URL,
  ME_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL
} from "../../app/services/authService";
import userTableMock from "../__mocks__/userTableMock";
import roleTableMock from "../__mocks__/roleTableMock";

export default function mockAuth(mock) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    debugger
    const { email, password } = JSON.parse(data);
    if (email && password) {
      const user = userTableMock.find(
          x =>
              x.email.toLowerCase() === email.toLowerCase() &&
              x.password === password
      );

      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onPost(REGISTER_URL).reply(({ data }) => {
    const { email, fullname, username, password } = JSON.parse(data);

    if (email && fullname && username && password) {
      const user = {
        email,
        fullname,
        username,
        password,
        roles: [2], // Manager
        accessToken: "access-token-" + Math.random(),
        refreshToken: "access-token-" + Math.random(),
        pic: process.env.PUBLIC_URL + "/media/users/default.jpg"
      };

      userTableMock.push(user);

      return [200, { ...user, password: undefined }];
    }

    return [400];
  });

  mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
    const { email } = JSON.parse(data);

    if (email) {
      const user = userTableMock.find(
          x => x.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        user.password = undefined;

        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
        Authorization &&
        Authorization.startsWith("Bearer ") &&
        Authorization.slice("Bearer ".length);
    if (accessToken) {
      const user = userTableMock.find(x => x.accessToken === accessToken);

      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }

    return [401];
  });


  //custome Mock Calls

  mock.onGet("api/auth/getroles").reply(({ data }) => {
    const roles = roleTableMock;
    return [200, { ...roles }]
  });

  mock.onPost("api/auth/saveRole").reply(({ data }) => {
    //const { roleId } = JSON.parse(roleId);
    const lastObj = roleTableMock[roleTableMock.length - 1];
    var obj = {
        'roleId': lastObj.roleId,
        'title': 'Customers'
    }
    roleTableMock.push(obj);
    return [200, { ...roleTableMock }]
  });

// -----------------users--------------------

  mock.onGet("api/auth/getusers").reply(({ data }) => {
    const users = userTableMock;
    return [200, { ...users }]
  });

  mock.onPost("api/auth/getusersById").reply(({ data }) => {
    const { userId } = JSON.parse(data);
    const user = userTableMock.find(x => x.userid == userId);
    if (user) {
        return [200, { ...user}];
    }
  });

  mock.onPost("api/auth/saveUser").reply(({data})=>{
    const { user } = JSON.parse(data);
    return [200, { ...user}];
  });

  mock.onPost("api/auth/updateUser").reply(({data})=>{
    const { user } = JSON.parse(data);
    return [200, { ...user}];
  });

  mock.onPost("api/auth/deleteUser").reply(({data})=>{
    const { userId } = JSON.parse(data);
    const users = userTableMock.filter(f => !userId.includes(f.userid));
    return [200, { ...users}];
  });
}
