import { memo, useCallback, useState } from "react";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../containers/header";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const select = useSelector((state) => ({
    userData: state.user.data,
    error: state.user.error,
  }));

  const callbacks = {
    // Отправка формы входа пользователя
    onLogin: useCallback(
      (user) => {
        store.actions.user.login(user);
        setPassword("");
      },
      [store]
    ),
    onChangeLogin: useCallback((e) => {
      setLogin(e.target.value);
    }, []),
    onChangePassword: useCallback((e) => {
      setPassword(e.target.value);
    }, []),
  };

  const { t } = useTranslate();
  return (
    <PageLayout>
      <Header />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        callbacks={callbacks}
        login={login}
        password={password}
        error={select.error}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
