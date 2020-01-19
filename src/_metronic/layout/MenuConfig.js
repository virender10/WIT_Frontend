import { ROLES } from "../../app/constants"

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
        isShownTo: [],
        submenu: [
          {
            title: "Well Section",
            allowedToPermission: 'canViewUsers',
            page: "dashboard/wellSelection"
          },
        ],
      },
      {
        title: "Well Information",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        bullet: "dot",
        isShownTo: [],
        submenu: [
          {
            title: "Edit Header",
            allowedToPermission: 'canViewUsers',
            page: "wellInformation/editHeader"
          },
        ],
      },
      {
        title: "Status / Events",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        bullet: "dot",
        isShownTo: [],
        submenu: [
          {
            title: "Edit Event",
            allowedToPermission: 'canViewUsers',
            page: "status/editEvent"
          },
          {
            title: "New Event",
            allowedToPermission: 'canViewUsers',
            page: "status/newEvent"
          },
        ],
      },
      {
        title: "Jobs",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "jobs",
        bullet: "dot",
        isShownTo: [],
        submenu: [
          {
            title: "Open Jobs",
            allowedToPermission: 'canViewUsers',
            page: "jobs/openJobs"
          },
          {
            title: "Create New",
            allowedToPermission: 'canViewUsers',
            page: "jobs/createNew"
          },
        ],
      },
      {
        title: "Companies",
        allowedToPermission: 'canAccessUserManagment',
        root: true,
        bullet: "dot",
        icon: "flaticon2-user-outline-symbol",
        submenu: [
          {
            title: "Create Company",
            allowedToPermission: 'canViewUsers',
            page: "company/create"
          },
          {
            title: "List of Companies",
            allowedToPermission: 'canViewRoles',
            page: "company/companyList"
          }
        ],
        isShownTo: [ROLES.SUPERADMIN]
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
            page: "user-management/Users/UserList",
          },
          {
            title: "Roles",
            allowedToPermission: 'canViewRoles',
            page: "user-management/Roles/RoleList"
          }
        ],
        isShownTo: [ROLES.SUPERADMIN, ROLES.ADMIN]
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
