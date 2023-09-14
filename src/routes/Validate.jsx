import { useState } from "react";
import { api } from "../axios";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useSelector } from "react-redux";

export default function Validate() {
  const email = useSelector((state) => state.registration.email);
  const [error, setError] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState({
    email: email,
    username: "",
    code: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch("/auth/registration/validation/", data);
      console.log("api.patch /auth/registration/validation", res);
      setError("");
      setSuccessful(true);
    } catch (e) {
      console.log("api.post /auth/registration/validation error", e.response);
      setError(Object.values(e.response.data));
      setSuccessful(false);
    }
  };

  return (
    <>
      <h2>Activate account</h2>
      <h3>The validation code has been sent to your email address</h3>

      <form onSubmit={handleSubmit}>
        {FormInput("email", data.email, handleChange, "email")}
        {FormInput("username", data.username, handleChange)}
        {FormInput("code", data.code, handleChange)}
        {FormInput("password", data.password, handleChange, "password")}
        {FormInput(
          "password_repeat",
          data.password_repeat,
          handleChange,
          "password"
        )}
        {FormInput("first_name", data.first_name, handleChange)}
        {FormInput("last_name", data.last_name, handleChange)}

        <button type="submit">Submit</button>
        {error.map((err) => (
          <p key={err} className="errorText">
            {err}
          </p>
        ))}
      </form>

      {successful && (
        <div className="hint">
          <div>The account has been successfully activated.</div>
          <Link to="/login">Log in.</Link>
        </div>
      )}
    </>
  );
}
