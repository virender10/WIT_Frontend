import React from "react";
import MenuSection from "./MenuSection";
import MenuItemSeparator from "./MenuItemSeparator";
import MenuItem from "./MenuItem";

export default class MenuSubmenu extends React.Component {

  showSubMenu = (item) => {
    const { currentRoleId } = this.props;
    if (!item.isShownTo || !currentRoleId) return true;
    return item.isShownTo.length === 0 || item.isShownTo.includes(currentRoleId);
  }

  render() {
    const { item, currentUrl, layoutConfig } = this.props;

    return (
      <ul className="kt-menu__subnav">
        {item.submenu.map((child, index) => {
          const showSubMenu = this.showSubMenu(child);
          if (!showSubMenu) return null
          return (
          <React.Fragment key={index}>
            {child.section && (
              <MenuSection
                item={child}
                parentItem={item}
                currentUrl={currentUrl}
              />
            )}

            {child.separator && (
              <MenuItemSeparator
                item={child}
                parentItem={item}
                currentUrl={currentUrl}
              />
            )}

            {child.title && (
              <MenuItem
                item={child}
                parentItem={item}
                currentUrl={currentUrl}
                layoutConfig={layoutConfig}
              />
            )}
          </React.Fragment>
        )})}
      </ul>
    );
  }
}
