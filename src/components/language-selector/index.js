import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function LanguageSelector({ setLanguage, currentLanguage }) {
  return (
    <select
      name="language"
      id="language-select"
      className="Head-language"
      value={currentLanguage}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}

LanguageSelector.propTypes = {
  title: PropTypes.node,
  currentLanguage: PropTypes.string,
  setLanguage: PropTypes.func,
};

export default memo(LanguageSelector);
