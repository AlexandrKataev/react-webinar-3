import { memo } from "react";
import PropTypes from "prop-types";

import "./style.css";

function LineLayout({ children }) {
  return <div className="LineLayout">{children}</div>;
}

LineLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(LineLayout);
