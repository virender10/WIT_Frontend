import React from "react";
import SearchDropdown from "../../../app/partials/layout/SearchDropdown";
import UserProfile from "../../../app/partials/layout/UserProfile";


export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">
        <SearchDropdown useSVG="true" />

        <UserProfile showHi={true} showBadge={false} />
      </div>
    );
  }
}
