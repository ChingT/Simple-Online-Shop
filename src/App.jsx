import { useState, useEffect } from "react";
import "./App.css";
import Router from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/slices/user";
import useFetch from "./hooks/useFetch";

function App() {
  const accessToken = useSelector((state) => state.user.accessToken);
  console.log("accessToken", accessToken);
  const dispatch = useDispatch();

  const [config, setConfig] = useState(null);
  const { resData, error } = useFetch(config);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      setConfig({
        method: "post",
        url: "/auth/token/verify/",
        data: { token },
      });
    } else {
      dispatch(logout());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (resData !== null) dispatch(login(token));
  }, [dispatch, resData, token]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("accessToken");
      dispatch(logout());
    }
  }, [dispatch, error]);

  if (accessToken || accessToken === null) return <Router />;
  return <h2>Loading accessToken...</h2>;
}

export default App;
