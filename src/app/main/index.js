import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    language: state.language.value,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.language);
  }, [select.totalPages, select.currentPage, select.language]);

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
    // Перейти на страницу
    setPage: useCallback(
      (number) => store.actions.catalog.setPage(number),
      [store]
    ),
    // Сменить язык
    setLanguage: useCallback(
      (language) => store.actions.language.setLanguage(language),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            language={select.language}
          />
        );
      },
      [callbacks.addToBasket, select.language]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={select.language === "ru" ? "Магазин" : "Shop"}
        setLanguage={callbacks.setLanguage}
        currentLanguage={select.language}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        setPage={callbacks.setPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
