import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, loadUser } from "../store/slices/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userData from "../../user.json";
import FormInput from "../components/FormInput";
import useFetch from "../hooks/useFetch";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    email: userData.email,
    password: userData.password,
  });
  const [config, setConfig] = useState(null);
  const { resData, loading, error } = useFetch(config);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfig({ method: "post", url: "/auth/token/", data });
  };

  useEffect(() => {
    if (resData) {
      dispatch(login(resData.access));
      dispatch(loadUser(resData.user));
      localStorage.setItem("accessToken", resData.access);
      navigate(location.state?.origin || "/account");
    }
  }, [resData, dispatch, loading, location.state, navigate]);

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
