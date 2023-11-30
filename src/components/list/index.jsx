import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List({ children }) {
  return <div className="List">{children}</div>;
}

List.propTypes = {
  children: PropTypes.node,
};

export default React.memo(List);
