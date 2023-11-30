import React from "react";
import PropTypes from "prop-types";

import Item from "../../item";
import List from "../../list";

import { formatCurrency } from "../../../utils";

function CartList({ cartList, onDeleteFromCart }) {
  return (
    <List>
      {cartList.map((item) => (
        <Item
          key={item.code}
          item={item}
          callback={() => onDeleteFromCart(item.code)}
          buttonName="Удалить"
        >
          <div>{formatCurrency(item.price)}</div>
          <div>{item.count} шт.</div>
        </Item>
      ))}
    </List>
  );
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(CartList);
