import { memo, useCallback, useEffect, useMemo } from "react";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";

import LocaleSelect from "../../containers/locale-select";
import UserCard from "../../components/user-card";
import Header from "../../containers/header";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.user.data,
    waiting: state.user.waiting,
    isError: state.user.error,
  }));

  useEffect(() => {
    !select.user && store.actions.user.getUser();
  }, [select.user]);

  useEffect(() => {
    !!select.isError && navigate("/login");
  }, [select.isError]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
