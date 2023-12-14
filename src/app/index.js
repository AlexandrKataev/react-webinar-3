import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import { useEffect } from "react";
import useStore from "../hooks/use-store";
import { checkCookie } from "../utils";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const select = useSelector((state) => ({
    activeModal: state.modals.name,
    user: state.user.data,
  }));
  const store = useStore();

  useEffect(() => {
    if (checkCookie("token")) {
      store.actions.user.getUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/profile"} element={<Profile />} />

        {!select.user && <Route path={"/login"} element={<Login />} />}
        <Route path="*" element={<Navigate to="" />} />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
