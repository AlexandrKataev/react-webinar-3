import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";

function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link className={cn("home")} to="/">
        {language === "ru" ? "Главная" : "Home"}
      </Link>
      <span className={cn("label")}>
        {language === "ru" ? "В корзине: " : "Cart: "}
      </span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: language === "ru" ? "товар" : "item",
              few: language === "ru" ? "товара" : "items",
              many: language === "ru" ? "товаров" : "items",
            })} / ${numberFormat(sum)} ₽`
          : language === "ru"
          ? `пусто`
          : "empty"}
      </span>
      <button onClick={onOpen}>
        {language === "ru" ? "Перейти" : "To cart"}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  language: "ru",
};

export default memo(BasketTool);
