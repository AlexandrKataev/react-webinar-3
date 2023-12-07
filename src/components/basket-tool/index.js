import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";

const homeTitle = {
  ru: "Главная",
  en: "Home",
};

const cartTitle = {
  ru: "В корзине: ",
  en: "Cart: ",
};

const itemTitles = {
  one: {
    ru: "товар",
    en: "item",
  },
  few: { ru: "товара", en: "items" },
  many: {
    ru: "товаров",
    en: "items",
  },
};

const emptyTitle = {
  ru: "пусто",
  en: "empty",
};

const toCartTitle = {
  ru: "Перейти",
  en: "To cart",
};

function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link className={cn("home")} to="/">
        {homeTitle[language]}
      </Link>
      <span className={cn("label")}>{cartTitle[language]}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: itemTitles.one[language],
              few: itemTitles.few[language],
              many: itemTitles.many[language],
            })} / ${numberFormat(sum)} ₽`
          : emptyTitle[language]}
      </span>
      <button onClick={onOpen}>{toCartTitle[language]}</button>
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
