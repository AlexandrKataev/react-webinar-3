import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchItemData = ({ itemId, language }) => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      fetch(
        `/api/v1/articles/${itemId}?fields=_id,title,price,edition,description,madeIn(title,code),category(title)&lang=${language}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("НЕ УДАЛОСЬ НАЙТИ ТОВАР :(");
          }
        })
        .then((data) => {
          setItemData(data.result);
        })
        .catch((e) => {
          alert(e.message);
          navigate("/");
        });
    };

    fetchItems();
  }, [itemId, language]);

  return itemData;
};
