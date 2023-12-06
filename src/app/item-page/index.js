import { useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import "./style.css";
import { numberFormat } from "../../utils";
import { useFetchItemData } from "./api/useFetchItemData";
import { useParams } from "react-router";

function ItemPage() {
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
  }));

  const itemData = useFetchItemData({ itemId, language: select.language });

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Сменить язык
    setLanguage: useCallback((language) =>
      store.actions.language.setLanguage(language)
    ),
  };

  return (
    <PageLayout>
      <Head
        title={itemData?.title || ""}
        setLanguage={callbacks.setLanguage}
        currentLanguage={select.language}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      {itemData && (
        <div className="ItemPage-body">
          <div>{itemData?.description}</div>
          <div>
            <span>
              {select.language === "ru"
                ? "Cтрана производитель: "
                : "Made in: "}
            </span>
            <b>{itemData?.madeIn.title + " " + `(${itemData?.madeIn.code})`}</b>
          </div>
          <div>
            <span>
              {select.language === "ru" ? "Категория: " : "Category: "}
            </span>
            <b>{itemData?.category.title}</b>
          </div>
          <div>
            <span>
              {select.language === "ru" ? "Год выпуска: " : "Edition year: "}
            </span>
            <b>{itemData?.edition}</b>
          </div>
          <div className="ItemPage-body-price">
            {(select.language === "ru" ? "Цена: " : "Price: ") +
              numberFormat(itemData?.price) +
              " ₽"}
          </div>
          <button onClick={() => callbacks.addToBasket(itemId)}>
            {select.language === "ru" ? "Добавить" : "Add"}
          </button>
        </div>
      )}
    </PageLayout>
  );
}

export default ItemPage;
