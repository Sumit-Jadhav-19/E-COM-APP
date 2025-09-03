import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easier usage
export const useCart = () => useContext(CartContext);
