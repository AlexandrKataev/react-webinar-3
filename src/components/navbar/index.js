import { memo } from "react";
import PropTypes from "prop-types";

import "./style.css";

import { Link } from "react-router-dom";

const homeTitle = {
  ru: "Главная",
  en: "Home",
};

function Navbar({ language }) {
  return (
    <div className="Navbar">
      <Link to="/">{homeTitle[language]}</Link>
    </div>
  );
}

Navbar.propTypes = {
  onAdd: PropTypes.func,
  language: PropTypes.string,
};

Navbar.defaultProps = {
  onAdd: () => {},
  language: "ru",
};

export default memo(Navbar);
