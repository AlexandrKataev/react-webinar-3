import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: 10,
      totalPages: 100,
      currentPage: 1,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=${this.getState().limit}&skip=${
        this.getState().currentPage * 10 - 9
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    console.log(response.headers.get("Content-Length"));
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / this.getState().limit),
      },
      "Загружены товары из АПИ"
    );
  }

  setPage(number) {
    this.setState({
      ...this.getState(),
      currentPage: number,
    });
  }
}

export default Catalog;
