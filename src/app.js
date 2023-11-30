import React, { useCallback, useState } from "react";

import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import ProductsList from "./components/products-list";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const cartItemCount = cartList.length;
  const totalPrice = store.getTotalPrice();

  const callbacks = {
    onOpenCart: useCallback(() => {
      setIsCartOpen(true);
    }, []),
    onCloseCart: useCallback(() => {
      setIsCartOpen(false);
    }, []),
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls
        onOpenCart={callbacks.onOpenCart}
        cartItemCount={cartItemCount}
        totalPrice={totalPrice}
      />
      <ProductsList productsList={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && (
        <Cart
          onCloseCart={callbacks.onCloseCart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          cartList={cartList}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
