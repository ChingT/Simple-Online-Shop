import { useEffect } from "react";
import "./App.css";
import Router from "./routes";
import { api } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/slices/user";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    console.log("localToken in App.jsx?", localToken);

    if (localToken) {
      api
        .post("/auth/token/verify/", { token: localToken })
        .then(() => dispatch(login(localToken)))
        .catch((e) => {
          console.log("/auth/token/verify/?", e);
          localStorage.removeItem("accessToken");
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  if (accessToken || accessToken === null) return <Router />;
  return <h2>Loading accessToken...</h2>;
}

export default App;
