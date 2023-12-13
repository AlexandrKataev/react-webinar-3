import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function LoginForm({ onLogin, error }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    onLogin({ login, password });
    setLogin("");
    setPassword("");
  };

  const cn = bem("LoginForm");
  return (
    <div className={cn()}>
      <div className={cn("title")}>Вход</div>
      <div className={cn("login")}>
        <div>Логин</div>
        <input
          className={cn("input")}
          type="text"
          onChange={(e) => onChangeLogin(e)}
          value={login}
        />
      </div>
      <div className={cn("password")}>
        <div>Пароль</div>
        <input
          className={cn("input")}
          type="password"
          onChange={(e) => onChangePassword(e)}
          value={password}
        />
      </div>
      {!!error && <div className={cn("error")}>{error}</div>}
      <button className={cn("button")} onClick={onClickLogin}>
        Войти
      </button>
    </div>
  );
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default memo(LoginForm);
