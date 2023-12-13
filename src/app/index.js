import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import { useEffect } from "react";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const store = useStore();
  useEffect(() => {
    if (
      document.cookie.split(";").filter(function (item) {
        return item.trim().indexOf("token=") == 0;
      }).length
    ) {
      store.actions.user.getUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
