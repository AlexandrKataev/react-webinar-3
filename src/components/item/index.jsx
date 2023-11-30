import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callback = (e) => {
    e.stopPropagation();
    props.callback();
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        {props.children}
        <button onClick={(e) => callback(e)}>{props.buttonName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
  buttonName: PropTypes.string,
};

Item.defaultProps = {
  callback: () => {},
};

export default React.memo(Item);
