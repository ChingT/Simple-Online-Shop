import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { motionAPI } from "./axios";
import useFetch from "./hooks/useFetch";
import Router from "./routes";
import { login, logout } from "./store/slices/user";

function App() {
  const accessToken = useSelector((state) => state.user.accessToken);
  console.log("accessToken", accessToken);
  const dispatch = useDispatch();

  const [config, setConfig] = useState(null);
  const { resData, error } = useFetch(motionAPI, config);

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
