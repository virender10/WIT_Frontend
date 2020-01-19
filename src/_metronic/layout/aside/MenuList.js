import React from 'react';
import MenuSection from './MenuSection';
import MenuItemSeparator from './MenuItemSeparator';
import MenuItem from './MenuItem';

export default class MenuList extends React.Component {
  render() {
    const { currentUrl, menuConfig, layoutConfig, userRoleId } = this.props;
    return menuConfig.aside.items.map((child, index) => {
      if (
        child.isShownTo.length === 0 ||
        (userRoleId && child.isShownTo.includes(userRoleId))
      ) {
        return (
          <React.Fragment key={`menuList${index}`}>
            {child.section && <MenuSection item={child} />}
            {child.separator && <MenuItemSeparator item={child} />}
            {child.title && (
              <MenuItem
                userRoleId={userRoleId}
                item={child}
                currentUrl={currentUrl}
                layoutConfig={layoutConfig}
              />
            )}
          </React.Fragment>
        );
      }
    });
  }
}
