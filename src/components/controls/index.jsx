import React from "react";
import PropTypes from "prop-types";
import "./style.css";

import { formatCurrency, plural } from "../../utils";

function Controls({ onOpenCart, cartItemCount, totalPrice }) {
  return (
    <div className="Controls">
      <div>В корзине:</div>
      <div>
        {cartItemCount > 0 ? (
          <b>
            {cartItemCount +
              " " +
              plural(cartItemCount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              }) +
              " / " +
              formatCurrency(totalPrice)}
          </b>
        ) : (
          <b> пусто</b>
        )}
      </div>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  cartItemCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

Controls.defaultProps = {
  onOpenCart: () => {},
  cartItemCount: 0,
  totalPrice: 0,
};

export default React.memo(Controls);
