import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";

import "./style.css";

const priceTitle = {
  ru: "Цена: ",
  en: "Price: ",
};

const madeInTitle = {
  ru: "Cтрана производитель: ",
  en: "Made in: ",
};

const categoryTitle = {
  ru: "Категория: ",
  en: "Category: ",
};

const editionTitle = {
  ru: "Год выпуска: ",
  en: "Edition: ",
};

const addTitle = {
  ru: "Добавить",
  en: "Add",
};

function ItemInfo(props) {
  return (
    <div className="ItemInfo">
      {!props.itemData && <Loader />}
      <div>{props.itemData?.description}</div>
      <div>
        <span>{madeInTitle[props.language]}</span>
        <b>
          {props.itemData?.madeIn.title +
            " " +
            `(${props.itemData?.madeIn.code})`}
        </b>
      </div>
      <div>
        <span>{categoryTitle[props.language]}</span>
        <b>{props.itemData?.category.title}</b>
      </div>
      <div>
        <span>{editionTitle[props.language]}</span>
        <b>{props.itemData?.edition}</b>
      </div>
      <div className="ItemPage-body-price">
        {priceTitle[props.language] +
          numberFormat(props.itemData?.price) +
          " ₽"}
      </div>
      <button onClick={() => props.addToBasket(props.itemData._id)}>
        {addTitle[props.language]}
      </button>
    </div>
  );
}

ItemInfo.propTypes = {
  itemData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.object,
  }).isRequired,
  addToBasket: PropTypes.func,
  language: PropTypes.string,
};

ItemInfo.defaultProps = {
  addToBasket: () => {},
  language: "ru",
};

export default memo(ItemInfo);
