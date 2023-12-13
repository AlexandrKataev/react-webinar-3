import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function HeaderBar({ userName, onClickLogout, onClickLogin, isAuth }) {
  return (
    <div className="Header">
      <Link to="/profile">{userName}</Link>
      {isAuth ? (
        <button onClick={onClickLogout}>Выход</button>
      ) : (
        <button onClick={onClickLogin}>Вход</button>
      )}
    </div>
  );
}

HeaderBar.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(HeaderBar);
