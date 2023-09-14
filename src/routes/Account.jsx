import { useEffect } from "react";
import { api } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/slices/user";

export default function Account() {
  const token = useSelector((state) => state.user.accessToken);
  const details = useSelector((state) => state.user.details);
  console.log("detals", details);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("/users/me/", config);
        console.log('pi.get "/users/me/"', res);
        dispatch(loadUser(res.data));
      } catch (e) {
        console.log('pi.get "/users/me/" error', e);
      }
    };

    fetchUser();
  }, [dispatch, token]);

  if (!details) return <h2>Loading user details...</h2>;
  return (
    <>
      User: {details.first_name} {details.last_name}
    </>
  );
}
