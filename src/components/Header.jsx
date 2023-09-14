import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/user";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.accessToken);
  console.log(`Header Is logged in ? ${isAuthenticated}`);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/account">Account</NavLink>
          <a onClick={(e) => handleLogout(e)}>Logout</a>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </header>
  );
}
