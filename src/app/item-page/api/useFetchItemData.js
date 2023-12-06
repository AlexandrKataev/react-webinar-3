import { useEffect, useState } from "react";

export const useFetchItemData = ({ itemId, language }) => {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchItemData = await fetch(
        `/api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)&lang=${language}`
      );
      const data = await fetchItemData.json();
      setItemData(data.result);
    };
    fetchItems();
  }, [itemId, language]);

  return itemData;
};
