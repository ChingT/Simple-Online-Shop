import { useState } from "react";
import { Link } from "react-router-dom";
import { motionAPI } from "../../axios";
import FormInput from "../../components/FormInput";
import useFetch from "../../hooks/useFetch";

export default function Register() {
  const [data, setData] = useState({ email: "" });
  const { sendRequest, resData, error } = useFetch(motionAPI);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ method: "post", url: "/auth/registration/", data });
  };

  return (
    <>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {FormInput("email", data.email, handleChange, "email")}

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
          <div>The validation code has been sent to your email address.</div>
          <Link to="/validate">Activate your account</Link>
        </div>
      )}
    </>
  );
}
