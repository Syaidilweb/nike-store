import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

export default function Checkout() {
  const navigate = useNavigate()
  const { 
    cart, 
    cartCount,
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart,
    getCartTotal,
    resetCart
  } = useCart()

  // State untuk ukuran sepatu per item
  const [itemSizes, setItemSizes] = useState({})

  const availableSizes = ["38", "39", "40", "41", "42", "43", "44", "45"]

  const handleSizeChange = (itemId, size) => {
    setItemSizes(prev => ({
      ...prev,
      [itemId]: size
    }))
  }

  const bayarSekarang = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!")
      return
    }

    // Cek apakah semua produk sudah memilih ukuran
    const allHaveSize = cart.every(item => itemSizes[item.id])
    
    if (!allHaveSize) {
      alert("Mohon pilih ukuran untuk semua produk!")
      return
    }

    // Simpan cart dengan ukuran
    const cartWithSizes = cart.map(item => ({
      ...item,
      size: itemSizes[item.id]
    }))

    localStorage.setItem("checkoutCart", JSON.stringify(cartWithSizes))
    localStorage.setItem("checkoutTotal", getCartTotal())
    navigate("/payment")
  }

  const handleResetCart = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua produk dari keranjang?")) {
      resetCart()
      setItemSizes({})
    }
  }

  // Jika cart kosong
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Keranjang Kosong</h2>
            <p className="text-gray-500 mb-8">
              Belum ada produk di keranjang Anda. Mulai belanja sekarang!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Mulai Belanja
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Home
            </Link>

            {cart.length >= 3 && (
              <button
                onClick={handleResetCart}
                className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* CART LIST */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Keranjang Belanja
                  </h2>
                  <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    {cartCount} Item
                  </span>
                </div>

                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${
                        index !== cart.length - 1 ? 'border-b pb-6' : ''
                      }`}
                    >
                      {/* IMAGE */}
                      <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* INFO & CONTROLS */}
                      <div className="flex-1 space-y-4">
                        {/* Product Info */}
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2">
                            {item.description}
                          </p>
                          <p className="text-black font-bold text-xl">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                        </div>

                        {/* Size Selector */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pilih Ukuran:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {availableSizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSizeChange(item.id, size)}
                                className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                                  itemSizes[item.id] === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          {!itemSizes[item.id] && (
                            <p className="text-red-500 text-xs mt-2">
                              * Pilih ukuran sebelum checkout
                            </p>
                          )}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-l-lg hover:bg-gray-50 transition font-semibold text-lg"
                            >
                              −
                            </button>
                            <div className="w-16 h-10 flex items-center justify-center border-t-2 border-b-2 border-gray-200 font-bold">
                              {item.qty}
                            </div>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-r-lg hover:bg-gray-50 transition font-semibold text-lg"
                            >
                              +
                            </button>
                          </div>

                          {/* Subtotal & Delete */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Subtotal</p>
                              <p className="font-bold text-lg">
                                Rp {(item.price * item.qty).toLocaleString("id-ID")}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition"
                              title="Hapus produk"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-6 text-gray-900">
                  Ringkasan Belanja
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Item</span>
                    <span className="font-semibold text-gray-900">{cartCount} Item</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      Rp {getCartTotal().toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="text-green-600 font-bold">GRATIS</span>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-2xl text-black">
                      Rp {getCartTotal().toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={bayarSekarang}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 mb-3 shadow-lg hover:shadow-xl"
                >
                  Bayar Sekarang
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm text-gray-600 hover:text-black transition font-medium"
                >
                  Lanjut Belanja
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Produk 100% Original</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Gratis Ongkir</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Garansi 30 Hari</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}