import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motionAPI } from "../../axios";
import FormInput from "../../components/FormInput";
import useFetch from "../../hooks/useFetch";
import { loadUser, login } from "../../store/slices/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({ email: "", password: "" });
  const { sendRequest, resData, error } = useFetch(motionAPI);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ method: "post", url: "/auth/token/", data });
  };

  useEffect(() => {
    if (resData) {
      dispatch(login(resData.access));
      dispatch(loadUser(resData.user));
      localStorage.setItem("accessToken", resData.access);
    }
  }, [dispatch, resData]);

  const isAuthenticated = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    if (isAuthenticated) navigate(location.state?.origin || "/");
  }, [isAuthenticated, location, navigate]);

  return (
    <>
      <h2>Log in</h2>

      <form id="login" onSubmit={handleSubmit}>
        {FormInput("email", data.email, handleChange, "email")}
        {FormInput("password", data.password, handleChange, "password")}

        <button type="submit">Submit</button>
      </form>

      {error &&
        error.map((err) => (
          <p key={err} className="errorText">
            {err}
          </p>
        ))}

      <div className="hint">
        <div>Do not have an account?</div>
        <Link to="/register">Register here</Link>
      </div>
    </>
  );
}
