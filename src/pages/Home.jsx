import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// IMPORT GAMBAR
import nike1 from "../assets/shoes/nike1.jpg"
import jordan1 from "../assets/shoes/jordan1.jpg"
import pegasus from "../assets/shoes/pegasus.jpg"

export default function Home() {
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

  const addToCart = (id) => {
    console.log("Add to cart product id:", id)
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-10">New Releases</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md 
                         hover:shadow-2xl transition-all duration-300 
                         hover:-translate-y-2"
            >
              {/* IMAGE WRAPPER */}
              <div className="bg-gray-100 h-64 flex items-center justify-center p-6 
                              overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain 
                             transition-transform duration-300 
                             group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-1">
                  {product.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-black text-white py-2.5 rounded-xl 
                             transition-all duration-300 
                             hover:bg-gray-900 hover:scale-[1.02] 
                             active:scale-95"
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
