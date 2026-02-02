import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/useCart"

// IMPORT GAMBAR
import nike1 from "../assets/shoes/nike1.jpg"
import jordan1 from "../assets/shoes/jordan1.jpg"
import pegasus from "../assets/shoes/pegasus.jpg"

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const products = [
    {
      id: 1,
      name: "Nike Air Force 1",
      price: 2100000,
      image: nike1,
    },
    {
      id: 2,
      name: "Air Jordan 1 Retro",
      price: 3200000,
      image: jordan1,
    },
    {
      id: 3,
      name: "Nike Pegasus 40",
      price: 1900000,
      image: pegasus,
    },
  ]

  const handleAddToCart = () => {
    addToCart()
    navigate("/checkout")
  }

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Find Your Perfect <br /> Nike Shoes
            </h1>
            <p className="text-gray-300 mb-8 max-w-md">
              Temukan koleksi sepatu Nike original dengan desain modern
              dan performa terbaik untuk gaya dan aktivitasmu.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:opacity-90"
            >
              Shop Now
            </button>
          </div>

          <div className="hidden md:block">
            <img
              src={nike1}
              alt="Nike Hero"
              className="w-full max-w-md mx-auto rotate-[-10deg]"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">New Releases</h2>
            <p className="text-gray-500 mt-1">
              Sepatu terbaru pilihan terbaik
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow
                         hover:shadow-2xl transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-64 bg-gray-100 rounded-t-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain
                             transition-transform duration-300
                             group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">
                  {product.name}
                </h3>

                <p className="text-gray-500 mb-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-3 rounded-xl
                             transition hover:opacity-90 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
