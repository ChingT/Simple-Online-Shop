import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "../pages/AccountPage";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Validate from "../pages/Authentication/Validate";
import Catalog from "../pages/Catalog";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "./Layout";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/validate" element={<Validate />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
