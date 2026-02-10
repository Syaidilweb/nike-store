import { useState } from "react"
import { ProductContext } from "./ProductContext"

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Air Force 1",
      price: 2100000,
      stock: 20,
      description: "Sepatu klasik Nike",
      image: "https://via.placeholder.com/150",
    },
  ])

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    )
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}
