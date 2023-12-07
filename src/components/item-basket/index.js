import { memo } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

const pcsTitle = {
  ru: "шт",
  en: "pcs",
};

const deleteTitle = {
  ru: "Удалить",
  en: "Delete",
};

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeBasket: () => props.closeBasket(),
  };

  return (
    <div className={cn()}>
      <Link
        className={cn("title")}
        to={`/item/${props.item._id}`}
        onClick={callbacks.closeBasket}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {pcsTitle[props.language]}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {deleteTitle[props.language]}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  language: PropTypes.string,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
