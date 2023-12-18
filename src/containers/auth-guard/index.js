import { useLocation, useNavigate } from "react-router-dom";

import useSelector from "../../hooks/use-selector";
import { useEffect } from "react";
import useStore from "../../hooks/use-store";

function AuthGuard({ children, redirectPath }) {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    authData: state.auth.data,
    isError: state.auth.error,
  }));

  useEffect(() => {
    !!select.isError &&
      navigate(redirectPath, { state: { from: location.pathname } });
  }, [select.isError]);

  useEffect(() => {
    !select.authData && store.actions.auth.checkAuth();
  }, [select.authData]);

  if (select.authData) {
    return children;
  }
}

export default AuthGuard;
