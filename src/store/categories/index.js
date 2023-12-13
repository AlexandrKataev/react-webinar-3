import StoreModule from "../module";

class Categories extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async load() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Загрузка категорий"
    );

    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        categories: json.result.items,
        waiting: false,
      },
      "Загружены категории"
    );
  }
}

export default Categories;
