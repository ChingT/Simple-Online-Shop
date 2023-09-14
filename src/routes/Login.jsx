import { useState } from "react";
import { api } from "../axios";
import { useDispatch } from "react-redux";
import { login, loadUser } from "../store/slices/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userData from "../../user.json";
import FormInput from "../components/FormInput";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState([]);
  const [data, setData] = useState({
    email: userData.email,
    password: userData.password,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/token/", data);
      console.log('api.post "/auth/token/"', res);
      dispatch(login(res.data.access));
      dispatch(loadUser(res.data.user));
      localStorage.setItem("accessToken", res.data.access);
      setError("");
      const target = location.state?.from || "/account";
      console.log("location.state", location.state);
      console.log("navigate to", target);
      navigate(target);
    } catch (e) {
      console.log('api.post "/auth/token/" error', e);
      setError(Object.values(e.response.data));
    }
  };

  return (
    <>
      <h2>Log in</h2>

      <form id="login" onSubmit={(e) => handleSubmit(e)}>
        {FormInput("email", data.email, handleChange, "email")}
        {FormInput("password", data.password, handleChange, "password")}

        <button type="submit">Submit</button>
        {error.map((err) => (
          <p key={err} className="errorText">
            {err}
          </p>
        ))}
      </form>

      <div className="hint">
        <div>Do not have an account?</div>
        <Link to="/register">Register here</Link>
      </div>
    </>
  );
}
