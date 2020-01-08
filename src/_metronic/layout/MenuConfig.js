export default {
  header: {
    self: {},
    items: [
      
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot",
        isShownTo: []
      },
      {
        title: "User Management",
        allowedToPermission: 'canAccessUserManagment',
        root: true,
        bullet: "dot",
        icon: "flaticon2-user-outline-symbol",
        submenu: [
          {
            title: "Users",
            allowedToPermission: 'canViewUsers',
            page: "user-management/Users/UserList"
          },
          {
            title: "Roles",
            allowedToPermission: 'canViewRoles',
            page: "user-management/Roles/RoleList"
          }
        ],
        isShownTo: ["admin", "superadmin"]
      },
      {
        title: "Data Management",
        root: true,
        allowedToPermission: 'canAccessDataManagment',
        bullet: "dot",
        icon: "flaticon2-user-outline-symbol",
        submenu: [
          {
            title: "User Entry",
            page: "data-management/UserForm"
          }
        ],
        isShownTo: []
      }
     
    ]
  }
};
