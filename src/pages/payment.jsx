import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart: stateCart, total: stateTotal } = location.state || {};
  const cart = stateCart || JSON.parse(localStorage.getItem("checkoutCart") || "[]");
  const total = stateTotal || Number(localStorage.getItem("checkoutTotal") || 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">
            Tidak ada pesanan. Kembali ke{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dibuat! Kami akan menghubungi Anda.");
    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("checkoutTotal");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">

          {/* Ringkasan Pesanan */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Ringkasan Pesanan</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <span>{item.name} x{item.qty}</span>
                  <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold mt-4 text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Form Data Pemesan */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Data Pemesan</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Nomor HP / WhatsApp"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
              <textarea
                name="address"
                placeholder="Alamat Lengkap"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                Buat Pesanan
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
