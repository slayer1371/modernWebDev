import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import CartPage from "./components/CartPage";
import AuthModule from "./auth/Auth";
import AuthRegister from "./auth/AuthRegister";
import AuthLogin from "./auth/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Parse from "parse";
import AdminRoute from "./auth/admin/AdminRoute";
import AdminOrders from "./auth/admin/AdminOrders";
import MyOrders from "./components/Myorder";


function PublicRoute({ children }) {
  if (Parse.User.current()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function Components() {
    return <div>
      <BrowserRouter>
            <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/my-orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />
          <Route path="/auth" element={
            <PublicRoute>
              <AuthModule />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <AuthRegister />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <AuthLogin />
            </PublicRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
}