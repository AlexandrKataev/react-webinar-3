import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAdd, language }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>
        {language === "ru" ? "Добавить" : "Add"}
      </button>
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
