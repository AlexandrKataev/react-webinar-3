import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import HeaderBar from "../../components/header-bar";
import { useNavigate, useLocation } from "react-router";

function Header() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    authData: state.auth.data,
  }));

  const callbacks = {
    onClickLogout: useCallback(() => store.actions.auth.logout(), [store]),

    onClickLogin: useCallback(() => {
      const currentPath = location.pathname;
      navigate("/login", { state: { from: currentPath } });
    }, [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <HeaderBar
      isAuth={!!select.authData}
      onClickLogin={callbacks.onClickLogin}
      onClickLogout={callbacks.onClickLogout}
      userName={select.authData?.profile.name}
    />
  );
}

export default memo(Header);
