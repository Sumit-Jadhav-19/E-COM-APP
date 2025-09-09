import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved).length : 0;
  });
  const addToCart = () =>
    setCartCount(() => {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved).length : 0;
    });
  const removeFromCart = () => {
    setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
  };
  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easier usage
export const useCart = () => useContext(CartContext);
