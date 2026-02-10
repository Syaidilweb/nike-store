import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { CartProvider } from "./context/CartProvider"
import ProductProvider from "./context/ProductProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
)
