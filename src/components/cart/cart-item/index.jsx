import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props) {

  const callbacks = {
    deleteFromCart: (e) => {
      e.stopPropagation();
      props.onDeleteFromCart(props.item.code);
    },
  }

  return (
    <div className={'CartItem'}
         onClick={callbacks.onClick}>
      <div className='CartItem-code'>{props.item.code}</div>
      <div className='CartItem-title'>
        {props.item.title}
      </div>
      <div className='CartItem-actions'>
			<div className='CartItem-price'>
        	{props.item.price + ' ₽'}
      </div>
			<div className='CartItem-price'>
        	{props.item.count + ' шт.'}
      </div>
        <button onClick={callbacks.deleteFromCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDeleteFromCart: PropTypes.func,
};

CartItem.defaultProps = {
  onDeleteFromCart: () => {
  },
}

export default React.memo(CartItem);
