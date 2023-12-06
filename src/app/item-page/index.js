import { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import "./style.css";
import { numberFormat } from "../../utils";

function ItemPage() {
  const store = useStore();

  const { itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchItemData = await fetch(`/api/v1/articles/${itemId}`);
      const data = await fetchItemData.json();

      const fetchCategory = await fetch(
        `/api/v1/categories/${data.result.category._id}`
      );
      const category = await fetchCategory.json();

      const fetchCountry = await fetch(
        `/api/v1/countries/${data.result.madeIn._id}`
      );
      const country = await fetchCountry.json();

      setItemData({
        ...data.result,
        category: category.result.title,
        madeIn: country.result.title,
      });
    };
    fetchItems();
  }, [itemId]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
  };

  return (
    <PageLayout>
      <Head title={itemData?.title || ""} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {itemData && (
        <div className="ItemPage-body">
          <div>{itemData.description}</div>
          <div>
            <span>Страна производитель: </span> <b>{itemData.madeIn}</b>
          </div>
          <div>
            <span>Категория: </span>
            <b>{itemData.category}</b>
          </div>
          <div>
            <span>Год выпуска: </span>
            <b>{itemData.edition}</b>
          </div>
          <div className="ItemPage-body-price">
            {"Цена: " + numberFormat(itemData.price) + " ₽"}
          </div>
          <button onClick={() => callbacks.addToBasket(itemId)}>
            Добавить
          </button>
        </div>
      )}
    </PageLayout>
  );
}

export default memo(ItemPage);
