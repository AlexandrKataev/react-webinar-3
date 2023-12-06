import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import LanguageSelector from "../language-selector";

function Head({ title, setLanguage, currentLanguage }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSelector
        setLanguage={setLanguage}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  currentLanguage: PropTypes.string,
  setLanguage: PropTypes.func,
};

export default memo(Head);
