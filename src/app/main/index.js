import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbar";
import LineLayout from "../../components/line-layout";
import Loader from "../../components/loader";
import { useNavigate, useSearchParams } from "react-router-dom";

const shopTitle = {
  ru: "Магазин",
  en: "Shop",
};

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    language: state.language.value,
    status: state.catalog.status,
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
    setPage: useCallback((number) => {
      store.actions.catalog.setPage(number);
    }),
    // Сменить язык
    setLanguage: useCallback(
      (language) => store.actions.language.setLanguage(language),
      [store]
    ),
    onOpenItemPage: useCallback(
      (itemId) => navigate(`/item/${itemId}`),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={() => callbacks.addToBasket(item._id)}
            onOpen={() => callbacks.onOpenItemPage(item._id)}
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
        title={shopTitle[select.language]}
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

      <List list={select.list} renderItem={renders.item} />

      {select.list.length > 0 && (
        <Pagination
          totalPages={select.totalPages}
          currentPage={select.currentPage}
          setPage={callbacks.setPage}
        />
      )}
      {select.status === "pending" && <Loader />}
    </PageLayout>
  );
}

export default memo(Main);
