import { useState } from "react";
import { Link } from "react-router-dom";
import { motionAPI } from "../../axios";
import FormInput from "../../components/FormInput";
import useFetch from "../../hooks/useFetch";

export default function Validate() {
  const [data, setData] = useState({
    email: "",
    username: "",
    code: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
  });
  const { sendRequest, resData, error } = useFetch(motionAPI);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      method: "patch",
      url: "/auth/registration/validation/",
      data,
    });
  };

  return (
    <>
      <h2>Activate account</h2>
      <h3>Checkout your Email for the validation code.</h3>

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
      </form>

      {error &&
        error.map((err) => (
          <p key={err} className="errorText">
            {err}
          </p>
        ))}

      {resData !== null && (
        <div className="hint">
          <div>The account has been successfully activated.</div>
          <Link to="/login">Log in.</Link>
        </div>
      )}
    </>
  );
}
