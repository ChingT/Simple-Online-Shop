import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motionAPI } from "../axios";
import { login, logout } from "../store/slices/user";
import useFetch from "./useFetch";

export default function useReloadAuth() {
  const dispatch = useDispatch();
  const { sendRequest, resData, error, loading } = useFetch(motionAPI);
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (token) {
      sendRequest({
        method: "post",
        url: "/auth/token/verify/",
        data: { token },
      });
    } else {
      dispatch(logout());
    }
  }, [token]);

  useEffect(() => {
    if (resData !== null) {
      dispatch(login({ access: token, user: { username } }));
    }
  }, [dispatch, resData, token, username]);

  useEffect(() => {
    if (error !== null) {
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
    }
  }, [dispatch, error]);

  return { loading };
}
