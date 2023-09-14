import { useState } from "react";
import { api } from "../axios";
import { useDispatch } from "react-redux";
import { login, loadUser } from "../store/slices/user";
import { useLocation, useNavigate } from "react-router-dom";
import data from "../../user.json";

export default function Login() {
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  console.log("Login location", location);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/token/", { email, password });
      console.log('api.post "/auth/token/"', res);
      dispatch(login(res.data.access));
      dispatch(loadUser(res.data.user));
      localStorage.setItem("accessToken", res.data.access);
      setLoginError("");
      const target = location.state?.from || "/account";
      console.log("location.state", location.state);
      console.log("navigate to", target);
      navigate(target);
    } catch (e) {
      console.log('api.post "/auth/token/" error', e);
      setLoginError(e.response.data.detail);
    }
  };

  return (
    <form id="login" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        name="email"
        placeholder="eMail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
      <p className="errorText">{loginError}</p>
    </form>
  );
}
