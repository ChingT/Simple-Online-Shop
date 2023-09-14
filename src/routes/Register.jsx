import { useState } from "react";
import { api } from "../axios";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useDispatch } from "react-redux";
import { setEmail } from "../store/slices/registration";

export default function Register() {
  const dispatch = useDispatch();
  const [error, setError] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState({ email: "123@123.123" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setEmail(data.email));

    try {
      const res = await api.post("/auth/registration/", data);
      console.log("api.post /auth/registration/", res);
      setError("");
      setSuccessful(true);
    } catch (e) {
      console.log("api.post /auth/registration/ error", e.response);
      setError(Object.values(e.response.data));
      setSuccessful(false);
    }
  };

  return (
    <>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {FormInput("email", data.email, handleChange, "email")}

        <button type="submit">Submit</button>
        {error.map((err) => (
          <p key={err} className="errorText">
            {err}
          </p>
        ))}
      </form>

      {successful && (
        <div className="hint">
          <div>The validation code has been sent to your email address.</div>
          <Link to="/validate">Activate your account</Link>
        </div>
      )}
    </>
  );
}
