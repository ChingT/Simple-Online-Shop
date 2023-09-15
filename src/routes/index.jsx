import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import Products from "./Shop/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Validate from "./auth/Validate";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/validate" element={<Validate />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
