import Main from "./main";
import Basket from "./basket";

import useSelector from "../store/use-selector";
import { Navigate, Route, Routes } from "react-router-dom";
import ItemPage from "./item-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:itemId" element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
