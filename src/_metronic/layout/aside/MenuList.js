import React from 'react';
import MenuSection from './MenuSection';
import MenuItemSeparator from './MenuItemSeparator';
import MenuItem from './MenuItem';

export default class MenuList extends React.Component {
  render() {
    const { currentUrl, menuConfig, layoutConfig, currentRoleId } = this.props;
    return menuConfig.aside.items.map((child, index) => {
      if (
        child.isShownTo.length === 0 ||
        (currentRoleId && child.isShownTo.includes(currentRoleId))
      ) {
        return (
          <React.Fragment key={`menuList${index}`}>
            {child.section && <MenuSection item={child} />}
            {child.separator && <MenuItemSeparator item={child} />}
            {child.title && (
              <MenuItem
                currentRoleId={currentRoleId}
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
