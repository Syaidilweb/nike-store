import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import AdminLogin from "./pages/AdminLogin"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  )
}
