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
import useInit from "../../hooks/use-init";

function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.user.load();
  }, []);

  const select = useSelector((state) => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

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
