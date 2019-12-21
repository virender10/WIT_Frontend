import { toAbsoluteUrl } from "../utils/utils";

export default [
  {
    userid: 1,
    username: "admin",
    password: "demo",
    email: "admin@demo.com",
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
    fullname: "Sean Vertex",
    firstname: "Sean",
    lastname: "Vertex",
    //accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    roles: [1], // Administrator
    role: "Administrator",
    pic: toAbsoluteUrl("/media/users/300_25.jpg"),
    //fullname: "Sean",
    // newPermissions:['canAccessUserManagment','canEditUser','canViewRoles','canEditRole',],
    permissions: [{ canAccessUserManagment: { canEditUser: true, canAddUser: false } }, { canViewRoles: { canEditRole: true, canAddRole: false } }, { canViewUsers: { canEditRole: true, canAddRole: false } },{ canAccessDataManagment: { } }],
    //permissions: [{ canAccessUserManagment: true , canEditUser: true, canAddUser: false } , { canViewRoles:true, canEditRole: true, canAddRole: false }, { canViewUsers:true, canEditRole: true, canAddRole: false },{canAccessDataManagment: true}],
    occupation: "CEO",
    companyName: "Keenthemes",
    phone: "456669067890",
    address: {
      addressLine: "1467  Griffin Street",
      city: "Phoenix",
      state: "Arizona",
      postCode: "85012"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/guest",
      facebook: "https://facebook.com/guest",
      twitter: "https://twitter.com/guest",
      instagram: "https://instagram.com/guest"
    }
  },
  {
    userid: 2,
    username: "user",
    password: "demo",
    email: "user@demo.com",
    accessToken: "access-token-6829bba69dd3421d8762-991e9e806dbf",
    refreshToken: "access-token-f8e4c61a318e4d618b6c199ef96b9e55",
    fullname: "Megan Ingram",
    firstname: "Megan",
    lastname: "Ingram",
    roles: [2], // Manager
    role: "Manager",
    pic: toAbsoluteUrl("/media/users/100_2.jpg"),
    occupation: "Deputy Head of Keenthemes in New York office",
    companyName: "Keenthemes",
    phone: "456669067891",
    address: {
      addressLine: "3487  Ingram Road",
      city: "Greensboro",
      state: "North Carolina",
      postCode: "27409"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/user",
      facebook: "https://facebook.com/user",
      twitter: "https://twitter.com/user",
      instagram: "https://instagram.com/user"
    }
  },
  {
    userid: 3,
    username: "guest",
    password: "demo",
    email: "guest@demo.com",
    accessToken: "access-token-d2dff7b82f784de584b60964abbe45b9",
    refreshToken: "access-token-c999ccfe74aa40d0aa1a64c5e620c1a5",
    fullname: "Ginobili Maccari",
    firstname: "Ginobili",
    lastname: "Maccari",
    //accessToken: "access-token-d2dff7b82f784de584b60964abbe45b9",
    roles: [3], // Guest
    role: "Guest",
    pic: toAbsoluteUrl("/media/users/default.jpg"),
    //fullname: "Ginobili Maccari",
    occupation: "CFO",
    companyName: "Keenthemes",
    phone: "456669067892",
    occupation: "CFO",
    companyName: "Keenthemes",
    phone: "456669067892",
    address: {
      addressLine: "1467  Griffin Street",
      city: "Phoenix",
      state: "Arizona",
      postCode: "85012"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/guest",
      facebook: "https://facebook.com/guest",
      twitter: "https://twitter.com/guest",
      instagram: "https://instagram.com/guest"
    }
  }
];

