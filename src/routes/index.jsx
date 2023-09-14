import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Account from "./Account";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./Register";
import Validate from "./Validate";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
