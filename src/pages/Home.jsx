import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import Toast from "../components/Toast"
import ImageGallery from "../components/ImageGallery"
import { useToast } from "../hooks/useToast"
import { Eye, ShoppingCart } from "lucide-react"

// IMPORT GAMBAR
import nike1 from "../assets/shoes/nike1.jpg"
import jordan1 from "../assets/shoes/jordan1.jpg"
import pegasus from "../assets/shoes/pegasus.jpg"

export default function Home() {
  const { addToCart } = useCart()
  const { toasts, showToast, removeToast } = useToast()
  
  // Gallery state
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    { 
      id: 1, 
      name: "Nike Air Force 1", 
      price: 2100000, 
      image: nike1,
      images: [nike1, nike1, nike1],
      description: "Klasik yang tak lekang waktu"
    },
    { 
      id: 2, 
      name: "Air Jordan 1 Retro", 
      price: 3200000, 
      image: jordan1,
      images: [jordan1, jordan1, jordan1],
      description: "Legenda basket legendaris"
    },
    { 
      id: 3, 
      name: "Nike Pegasus 40", 
      price: 1900000, 
      image: pegasus,
      images: [pegasus, pegasus, pegasus],
      description: "Kenyamanan untuk lari jarak jauh"
    },
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
    showToast(
      `${product.name} telah ditambahkan ke keranjang!`,
      "cart",
      3000
    )
  }

  const openGallery = (product) => {
    setSelectedProduct(product)
    setGalleryOpen(true)
  }

  return (
    <>
      <Navbar />

      {/* Toast Notifications */}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Image Gallery Modal */}
      {selectedProduct && (
        <ImageGallery
          images={selectedProduct.images}
          productName={selectedProduct.name}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={nike1}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 animate-heroFade"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 animate-slideInLeft">
              Find Your Perfect <br /> Nike Shoes
            </h1>
            <p className="text-gray-300 mb-8 max-w-md animate-fadeIn delay-200">
              Temukan koleksi sepatu Nike original dengan desain modern
              dan performa terbaik untuk gaya dan aktivitasmu.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition transform duration-300 shadow-lg hover:shadow-2xl animate-fadeIn delay-400"
            >
              Shop Now
            </button>
          </div>

          <div className="hidden md:block relative animate-slideInRight">
            <img
              src={nike1}
              alt="Nike Hero"
              className="w-full max-w-md mx-auto rotate-[-10deg] transition-transform duration-500 hover:scale-105 hover:rotate-0"
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes heroFade {
            0% { opacity: 0.2; transform: scale(1.05); }
            50% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.2; transform: scale(1.05); }
          }
          .animate-heroFade { animation: heroFade 8s ease-in-out infinite; }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInLeft { animation: slideInLeft 1s forwards; }

          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInRight { animation: slideInRight 1s forwards; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 1s forwards; }
          .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
          .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
        `}</style>
      </section>

      {/* PRODUCT SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">New Releases</h2>
            <p className="text-gray-500 mt-1">Sepatu terbaru pilihan terbaik</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow hover:shadow-2xl transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-64 bg-gray-100 rounded-t-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Quick View Button */}
                <button
                  onClick={() => openGallery(product)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5 text-black" />
                </button>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                  NEW
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                <p className="text-black font-bold text-xl mb-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-black text-white py-3 rounded-xl transition hover:opacity-90 active:scale-95 font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => openGallery(product)}
                    className="bg-gray-100 text-black p-3 rounded-xl transition hover:bg-gray-200 active:scale-95"
                    aria-label="View gallery"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}