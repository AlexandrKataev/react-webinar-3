import { memo, useCallback, useEffect } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useNavigate } from "react-router-dom";

const cartTitle = {
  ru: "Корзина",
  en: "Cart",
};

function Basket() {
  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
  }));

  useEffect(() => {
    store.actions.basket.load(select.language);
  }, [select.language]);

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onOpen: useCallback((itemId) => navigate(`/item/${itemId}`)),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={() => callbacks.removeFromBasket(item._id)}
            closeBasket={callbacks.closeModal}
            onOpen={() => callbacks.onOpen(item._id)}
            language={select.language}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title={cartTitle[select.language]}
      onClose={callbacks.closeModal}
      language={select.language}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={select.language} />
    </ModalLayout>
  );
}

export default memo(Basket);
