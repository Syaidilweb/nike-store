import { useState } from "react"
import { CartContext } from "./CartContext"

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        // Jika produk sudah ada, tambah quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      // Jika produk baru, tambahkan ke cart dengan qty 1
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    )
  }

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.qty - 1
          return newQty > 0 ? { ...item, qty: newQty } : item
        }
        return item
      }).filter((item) => item.qty > 0)
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0)
  }

  const resetCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((total, item) => total + item.qty, 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}