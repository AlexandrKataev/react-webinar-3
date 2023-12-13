import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      data: null,
      token: null,
      waiting: false,
      error: null,
    };
  }

  login(user) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Отправка формы входа"
    );

    fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
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
            "Пользователь авторизован"
          );
        } else {
          this.setState(
            {
              ...this.getState(),
              token: data.result.token,
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
        "X-token": document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
      },

      credentials: "include",
    }).finally(() => {
      document.cookie = `token=;expires=${new Date(0)}`;
      this.setState(this.initState(), "Пользователь вышел");
    });
  }

  getUser() {
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
        "X-token": document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        ),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          document.cookie = `token=;expires=${new Date(0)}`;
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
