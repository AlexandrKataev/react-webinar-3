import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

const addTitle = {
  ru: "Добавить",
  en: "Add",
};

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: () => props.onAdd(),
    onOpen: () => props.onOpen(),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")} onClick={callbacks.onOpen}>
        {props.item.title}
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{addTitle[props.language]}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  language: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  onOpen: () => {},
  language: "ru",
};

export default memo(Item);
