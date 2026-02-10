import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Payment from "./pages/payment"; // <--- import payment page
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
