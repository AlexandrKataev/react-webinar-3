import StoreModule from "../module";

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  //Загрузка товаров в корзину
  async load(language) {
    const response = await fetch(
      `/api/v1/articles?limit=*&lang=${language}&search[ids]=${this.getState().list.reduce(
        (str, el) => {
          return str + "|" + el._id;
        },
        ""
      )}`
    );
    const json = await response.json();

    const newList = this.getState().list.map((el, i) => {
      return { ...json.result.items[i], amount: el.amount };
    });
    this.setState(
      {
        ...this.getState(),
        list: newList,
      },
      "Загружены товары корзины из АПИ"
    );
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id, language) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map((item) => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result?.price * result.amount;
      return result;
    });

    // Если товара нет в корзине, подгружаем его с сервера и добавляем
    if (!exist) {
      const response = await fetch(
        `/api/v1/articles/${_id}?fields=_id,title,price,edition,description,madeIn(title,code),category(title)`
      );
      const json = await response.json();
      list.push({ ...json.result, amount: 1 });
      sum += json.result?.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      "Добавление в корзину"
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter((item) => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      "Удаление из корзины"
    );
  }
}

export default Basket;
