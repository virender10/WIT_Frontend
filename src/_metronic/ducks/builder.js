import objectPath from "object-path";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LayoutConfig from "../layout/LayoutConfig";
import MenuConfig from "../layout/MenuConfig";

export const actionTypes = {
  SetMenuConfig: "builder/SET_MENU_CONFIG",
  SetLayoutConfigs: "builder/SET_LAYOUT_CONFIGS",
  SetLayoutConfigsWithPageRefresh: "builder/SET_LAYOUT_CONFIGS_WITH_PAGE_REFRESH",
  SetHtmlClassService: "builder/SET_HTML_CLASS_SERVICE"
};

export const selectors = {
  getClasses: (store, params) => {
    const { htmlClassServiceObjects } = store.builder;

    return htmlClassServiceObjects
      ? htmlClassServiceObjects.getClasses(params.path, params.toString)
      : "";
  },

  getConfig: (state, path) => {
    const { layoutConfig } = state.builder;
    if (path) {
      // if path is specified, get the value within object
      return objectPath.get(layoutConfig, path);
    }

    return "";
  },

  getLogo: ({ builder: { layoutConfig } }) => {
    const menuAsideLeftSkin = objectPath.get(layoutConfig, "brand.self.skin");
    // set brand logo
    const logoObject = objectPath.get(layoutConfig, "self.logo");
    let logo;
    if (typeof logoObject === "string") {
      logo = logoObject;
    }

    if (typeof logoObject === "object") {
      logo = objectPath.get(logoObject, menuAsideLeftSkin + "");
    }

    if (typeof logo === "undefined") {
      try {
        const logos = objectPath.get(this.layoutConfig, "self.logo");
        logo = logos[Object.keys(logos)[0]];
      } catch (e) { }
    }
    return logo;
  },

  getStickyLogo: store => {
    const { layoutConfig } = store.builder;
    let logo = objectPath.get(layoutConfig, "self.logo.sticky");
    if (typeof logo === "undefined") {
      logo = selectors.getLogo(store);
    }
    return logo + "";
  },
  getPermissions: store => {
    const { auth: { user: permissions } } = store;
    debugger
    return permissions || [];
  }
};

const initialState = {
  menuConfig: MenuConfig,
  layoutConfig: LayoutConfig,
  htmlClassServiceObjects: undefined
};

export const reducer = persistReducer(
  {
    storage,
    key: "build-welltech",
    blacklist: ["htmlClassServiceObjects"]
  },
  (state = initialState, { type, payload }) => {
    switch (type) {
      case actionTypes.SetMenuConfig:
        const { menuConfig, permissions } = payload;
        debugger
        // menuConfig.aside.items.map(m => {
        //   if (m.submenu) {
        //     m.submenu = m.submenu.filter(m => !m.allowedToPermission || permissions.filter(n => Object.keys(n).includes(m.allowedToPermission)).length);
        //     //const data = m.submenu.filter(m => !m.allowedToPermission || permissions.filter(n => Object.values(n).includes(m.allowedToPermission)).length);
        //   };
        //   return m;
        // })
        // menuConfig.aside.items = menuConfig.aside.items.filter(m => !m.allowedToPermission || permissions.filter(n => Object.keys(n).includes(m.allowedToPermission)).length)
        // menuConfig.aside.items = menuConfig.aside.items.filter(m => {
        //   let show = true;
        //   if (m.submenu) {
        //     show = !!m.submenu.length;
        //   }
        //   return show;
        // })
        return { ...state, menuConfig };

      case actionTypes.SetLayoutConfigs:
        return { ...state, layoutConfig: payload };

      case actionTypes.SetLayoutConfigsWithPageRefresh: {
        return { ...state, layoutConfig: payload };
      }
      case actionTypes.SetHtmlClassService:
        return { ...state, htmlClassServiceObjects: payload };

      default:
        return state;
    }
  }
);

export const actions = {
  setMenuConfig: payload => ({ payload, type: actionTypes.SetMenuConfig }),

  setLayoutConfigs: payload => ({
    payload,
    type: actionTypes.SetLayoutConfigs
  }),

  setLayoutConfigsWithPageRefresh: payload => ({
    payload,
    type: actionTypes.SetLayoutConfigsWithPageRefresh
  }),

  setHtmlClassService: payload => ({
    payload,
    type: actionTypes.SetHtmlClassService
  })
};
