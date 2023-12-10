import StoreModule from "../module";

class Item extends StoreModule {
  initState() {
    return {
      itemData: null,
      status: "pending",
    };
  }

  async load(itemId, language) {
    this.setStatus("pending");
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
          this.setState(
            {
              ...this.getState(),
              itemData: data.result,
              status: "fullfilled",
            },
            "Загружен товар из АПИ"
          );
        })
        .catch((e) => {
          alert(e.message);
          this.setState(
            {
              ...this.getState(),
              status: "ejected",
            },
            "Ошибка загрузки товара из АПИ"
          );
        });
    };
    fetchItems();
  }

  setStatus(str) {
    this.setState({
      status: "reset",
    });
  }

  resetState() {
    this.setState(this.initState(), "reset состояния");
  }
}

export default Item;
