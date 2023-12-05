import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";

function ItemPage() {
  const store = useStore();

  const { itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/v1/articles/${itemId}`);
      const data = await response.json();
      console.log(data.result);
      setItemData(data.result);
    };
    fetchItems();
  }, []);

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
        <>
          <div>{itemData.description}</div>
          <div>{itemData.madeIn._id}</div>
        </>
      )}
    </PageLayout>
  );
}

export default memo(ItemPage);
