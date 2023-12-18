import { deleteCookie, getCookie } from "../../utils";
import StoreModule from "../module";

class Auth extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false,
      error: null,
    };
  }

  login(authDto) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Отправка формы входа"
    );

    fetch(`/api/v1/users/sign?fields=_id,profile(name)`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(authDto),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState(
            {
              ...this.getState(),
              error: data.error.data.issues[0].message,
              waiting: false,
            },
            "Ошибка авторизации"
          );
        } else {
          this.setState(
            {
              ...this.getState(),
              data: data.result.user,
              error: null,
              waiting: false,
            },
            "Пользователь авторизован"
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  logout() {
    fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "X-token": getCookie("token"),
      },

      credentials: "include",
    }).finally(() => {
      deleteCookie("token");
      this.setState(this.initState(), "Пользователь вышел");
    });
  }

  checkAuth() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Запрос данных авторизации"
    );

    fetch(`/api/v1/users/self?fields=_id,profile(name)`, {
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
            "Ошибка загрузки данных авторизации"
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

export default Auth;
