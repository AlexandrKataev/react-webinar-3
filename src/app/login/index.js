import { memo, useCallback, useEffect, useState } from "react";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../containers/header";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const select = useSelector((state) => ({
    authData: state.auth.data,
    error: state.auth.error,
  }));

  const callbacks = {
    // Отправка формы входа пользователя
    onLogin: useCallback(
      (authDto) => {
        store.actions.auth.login(authDto);
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

  useEffect(() => {
    const state = location.state;
    if (select.authData) {
      if (state?.from) {
        navigate(state?.from);
      } else {
        navigate("/profile");
      }
    }
  }, [select.authData]);

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
