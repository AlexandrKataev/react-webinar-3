import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import HeaderBar from "../../components/header-bar";
import { useNavigate } from "react-router";

function Header() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.user.data,
  }));

  const callbacks = {
    onClickLogout: useCallback(() => store.actions.user.logout(), [store]),

    onClickLogin: useCallback(() => {
      navigate("/login");
    }, [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <HeaderBar
      isAuth={!!select.user}
      onClickLogin={callbacks.onClickLogin}
      onClickLogout={callbacks.onClickLogout}
      userName={select.user?.profile.name}
    />
  );
}

export default memo(Header);
