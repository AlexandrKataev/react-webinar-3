import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function LoginForm({ error, login, password, callbacks, t }) {
  const cn = bem("LoginForm");
  return (
    <div className={cn()}>
      <div className={cn("title")}>{t("login.title")}</div>
      <div className={cn("login")}>
        <div>{t("login.login")}</div>
        <input
          className={cn("input")}
          type="text"
          onChange={(e) => callbacks.onChangeLogin(e)}
          value={login}
        />
      </div>
      <div className={cn("password")}>
        <div>{t("login.password")}</div>
        <input
          className={cn("input")}
          type="password"
          onChange={(e) => callbacks.onChangePassword(e)}
          value={password}
        />
      </div>
      {!!error && <div className={cn("error")}>{error}</div>}
      <button
        className={cn("button")}
        onClick={() => callbacks.onLogin({ login, password })}
      >
        {t("login.enter")}
      </button>
    </div>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
  callbacks: PropTypes.object,
  t: PropTypes.func,
};

export default memo(LoginForm);
