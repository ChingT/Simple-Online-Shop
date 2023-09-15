import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { loadUser } from "../store/slices/user";

export default function Account() {
  const token = useSelector((state) => state.user.accessToken);
  const details = useSelector((state) => state.user.details);
  const dispatch = useDispatch();

  const [config, setConfig] = useState(null);
  const { resData } = useFetch(config);

  useEffect(() => {
    setConfig({
      method: "get",
      url: "/users/me/",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  useEffect(() => {
    dispatch(loadUser(resData));
  }, [dispatch, resData]);

  if (!details) return <h2>Loading user details...</h2>;

  return (
    <>
      User: {details.first_name} {details.last_name}
    </>
  );
}
