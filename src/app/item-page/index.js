import { useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { useParams } from "react-router";
import ItemInfo from "../../components/item-info";
import Navbar from "../../components/navbar";
import LineLayout from "../../components/line-layout";
import Loader from "../../components/loader";

function ItemPage() {
  const store = useStore();
  const { itemId } = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
    itemData: state.item.itemData,
    isPending: state.item.status === "pending",
  }));

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
    resetItemData: useCallback(() => {
      store.actions.item.resetState();
    }),
  };

  useEffect(() => {
    store.actions.item.load(itemId, select.language);
    return callbacks.resetItemData;
  }, [itemId, select.language]);

  return (
    <PageLayout>
      <Head
        title={select.itemData?.title || ""}
        setLanguage={callbacks.setLanguage}
        currentLanguage={select.language}
      />
      <LineLayout>
        <Navbar language={select.language} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
      </LineLayout>

      {select.itemData && (
        <ItemInfo
          addToBasket={callbacks.addToBasket}
          itemData={select.itemData}
          language={select.language}
        />
      )}
      {!select.itemData && <Loader />}
    </PageLayout>
  );
}

export default ItemPage;
