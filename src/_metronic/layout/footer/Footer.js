import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import * as builder from "../../ducks/builder";

class Footer extends React.Component {
  render() {
    const today = new Date().getFullYear();
    return (
      <div
        className={`kt-footer ${this.props.footerClasses} kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop`}
        id="kt_footer"
      >
        <div className={`kt-container ${this.props.footerContainerClasses}`}>
          <div className="kt-footer__copyright">
          &nbsp;&copy;&nbsp;{today.toString()}&nbsp;
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="kt-link"
            >
              Well Information Technology
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  fluid:
    objectPath.get(store.builder.layoutConfig, "footer.self.width") === "fluid",
  footerClasses: builder.selectors.getClasses(store, {
    path: "footer",
    toString: true
  }),
  footerContainerClasses: builder.selectors.getClasses(store, {
    path: "footer_container",
    toString: true
  })
});

export default connect(mapStateToProps)(Footer);
