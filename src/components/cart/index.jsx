import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import Head from "../head";
import CartList from "./cart-list";
import { formatCurrency } from "../../utils";

function Cart({ onCloseCart, cartList, onDeleteFromCart, totalPrice }) {
  return (
    <>
      <div className="Cart-background" onClick={onCloseCart} />
      <div className="Cart">
        <Head title="Корзина">
          <button onClick={onCloseCart}>Закрыть</button>
        </Head>
        <div className="Cart-body">
          {!cartList.length && (
            <div className="Cart-body-empty">Корзина пуста</div>
          )}
          {!!cartList.length && (
            <>
              <CartList
                cartList={cartList}
                onDeleteFromCart={onDeleteFromCart}
              />
              <div className="Cart-body-total">
                <b>Итого</b>
                <b>{formatCurrency(totalPrice)}</b>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  onCloseCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  totalPrice: PropTypes.number,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.number,
    })
  ).isRequired,
};

Cart.defaultProps = {
  onCloseCart: () => {},
  onDeleteFromCart: () => {},
  totalPrice: 0,
};

export default Cart;
