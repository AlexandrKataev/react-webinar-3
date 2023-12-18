import { deleteCookie, getCookie } from "../../utils";
import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false,
      error: null,
    };
  }

  load() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Запрос данных пользователя"
    );

    fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "X-token": getCookie("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          deleteCookie("token");
          this.setState(
            {
              ...this.getState(),
              error: "Please login",
            },
            "Данные пользователя загружены"
          );
        } else {
          this.setState(
            {
              ...this.getState(),
              data: data.result,
              waiting: false,
              error: null,
            },
            "Данные пользователя загружены"
          );
        }
      });
  }
}

export default User;
