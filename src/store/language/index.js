import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      value: "ru",
    };
  }

  setLanguage(language) {
    this.setState(
      {
        value: language,
      },
      "Изменение языка"
    );
  }
}

export default Language;
