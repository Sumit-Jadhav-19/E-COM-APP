import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
export default function Cart({ cartToggle }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    if (cartToggle) {
      setCartItems(() => {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
      });
    }
  }, [cartToggle]);
   // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      {cartToggle ? (
        <div className="w-full h-full bg-black/50 z-50 absolute top-12 right-0 transition duration-500 ease-in-out"></div>
      ) : (
        ""
      )}

      <div
        className={`h-full w-70 bg-white absolute right-0 top-12 transition-all duration-500 ease-in-out translate-x-[${
          cartToggle ? "0" : "300"
        }px] z-51 border-t-1 border-t-gray-300`}
      >
        <h1 className="text-center py-5 text-md font-semibold flex items-center gap-1 justify-center">
          {" "}
          <ShoppingBagIcon className="w-4 h-4"></ShoppingBagIcon>
          <span>Your Cart Items</span>
        </h1>
        <hr className="text-gray-300" />
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.Id}>
                Product ID: {item.Id}, Qty: {item.Qty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
