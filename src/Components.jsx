import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import CartPage from "./components/CartPage";
import AuthModule from "./auth/Auth";
import AuthRegister from "./auth/AuthRegister";
import AuthLogin from "./auth/AuthLogin";

export function Components() {
    return <div>
      <BrowserRouter>
            <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="*" element={<h2>404 - Not Found</h2>} /> */}
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
}