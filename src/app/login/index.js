import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../containers/header";
import LoginForm from "../../components/login-form";

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    userData: state.user.data,
    error: state.user.error,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    onLogin: useCallback(
      (user) => {
        store.actions.user.login(user);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Header onClick={callbacks.onClick} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm onLogin={callbacks.onLogin} error={select.error} />
    </PageLayout>
  );
}

export default memo(Login);
