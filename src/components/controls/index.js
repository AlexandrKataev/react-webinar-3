import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

const addTitle = {
  ru: "Добавить",
  en: "Add",
};

function Controls({ onAdd, language }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{addTitle[language]}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  language: PropTypes.string,
};

Controls.defaultProps = {
  onAdd: () => {},
  language: "ru",
};

export default memo(Controls);
