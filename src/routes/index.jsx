import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Validate from "../pages/Authentication/Validate";
import Cart from "../pages/Cart";
import Catalog from "../pages/Catalog";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "./Layout";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Router() {
  return (
    <BrowserRouter basename="/Simple-Online-Shop">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/validate" element={<Validate />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
