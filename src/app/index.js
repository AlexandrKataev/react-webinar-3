import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import { useEffect } from "react";
import useStore from "../hooks/use-store";
import AuthGuard from "../containers/auth-guard";
import { checkCookie } from "../utils";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const select = useSelector((state) => ({
    activeModal: state.modals.name,
    authData: state.auth.data,
  }));
  const store = useStore();

  useEffect(() => {
    if (checkCookie("token")) {
      !select.authData && store.actions.auth.checkAuth();
    }
  }, [select.authData]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/profile"}
          element={
            <AuthGuard redirectPath={"/login"}>
              <Profile />
            </AuthGuard>
          }
        />

        <Route path={"/login"} element={<Login />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
