import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motionAPI } from "../axios";
import useFetch from "../hooks/useFetch";
import { loadUser } from "../store/slices/user";

export default function Account() {
  const token = useSelector((state) => state.user.accessToken);
  const details = useSelector((state) => state.user.details);
  const dispatch = useDispatch();

  const { sendRequest, resData } = useFetch(motionAPI);

  useEffect(() => {
    sendRequest({
      method: "get",
      url: "/users/me/",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, []);

  useEffect(() => {
    if (resData !== null) dispatch(loadUser(resData));
  }, [dispatch, resData]);

  if (!details) return <h2>Loading user details...</h2>;

  return (
    <>
      User: {details.first_name} {details.last_name}
    </>
  );
}
