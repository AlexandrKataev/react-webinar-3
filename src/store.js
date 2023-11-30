import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

	/**
	 * Добавление товара в корзину
	 * @param item
	 */
  addToCart(item) {
		if(this.state.cartList.some(el => el.code === item.code)) {
			this.setState({...this.state, cartList: this.state.cartList.map((el) => {
				if(el.code === item.code) {
					return {...el, count: el.count + 1}
				} else {
					return el
				}
			})})
		} else {
			this.setState({...this.state, cartList: [...this.state.cartList, {...item, count: 1}]})
		}
	}

	/**
	 * Удаление товара из корзины
	 * @param code
	 */
	deleteFromCart(code) {
		console.log('удалить товар')
		this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code)
    })
	}
  /**
	 * Получить итоговую сумму
	 */
	getTotalPrice() {
		return this.state.cartList.reduce((sum, item) => {
			return sum + item.price * item.count
		}, 0)
	}
}

export default Store;
