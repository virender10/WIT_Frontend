import React from 'react';
import MenuSection from './MenuSection';
import MenuItemSeparator from './MenuItemSeparator';
import MenuItem from './MenuItem';

export default class MenuList extends React.Component {
  render() {
    const { currentUrl, menuConfig, layoutConfig, userRole } = this.props;
    return menuConfig.aside.items.map((child, index) => {
      if (
        child.isShownTo.length === 0 ||
        child.isShownTo.includes(userRole.toLowerCase())
      ) {
        return (
          <React.Fragment key={`menuList${index}`}>
            {child.section && <MenuSection item={child} />}
            {child.separator && <MenuItemSeparator item={child} />}
            {child.title && (
              <MenuItem
                userRole={userRole}
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
