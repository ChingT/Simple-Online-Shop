import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useCalculate from "../../hooks/useCalculate";
import { logout } from "../../store/slices/user";
import "./index.css";

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.accessToken);
  const username = useSelector((state) => state.user.username);
  const { totalNumItems, totalPrice } = useCalculate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  };

  return (
    <header>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated ? (
        <NavLink to="/" id="login-info" onClick={handleLogout}>
          <div>Logout</div>
          <div className="username">Logged in as {username}</div>
        </NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <NavLink to="/cart" id="header-cart">
        <div>Cart ({totalNumItems})</div>
        <div className="totalPrice">{totalPrice} EUR</div>
      </NavLink>
    </header>
  );
}
