import React from "react";
import PropTypes from "prop-types";

import Item from "../item";
import List from "../list";

import { formatCurrency } from "../../utils";

function ProductsList({ productsList, onAddToCart }) {
  return (
    <List>
      {productsList.map((item) => {
        return (
          <Item
            key={item.code}
            item={item}
            buttonName="Добавить"
            callback={() => onAddToCart(item)}
          >
            <div>{formatCurrency(item.price)}</div>
          </Item>
        );
      })}
    </List>
  );
}

ProductsList.propTypes = {
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(ProductsList);
