import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
export default function Cart({ cartToggle }) {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();

  useEffect(() => {
    if (cartToggle) {
      loadCartItems();
    }
  }, [cartToggle]);

  const loadCartItems = async () => {
    const saved = localStorage.getItem("cartItems");
    const jsonRes = saved ? JSON.parse(saved) : [];
    const products = [];
    for (let i = 0; i < jsonRes.length; i++) {
      const productId = jsonRes[i].Id;
      const res = await GetProduct(productId);
      products.push({ ...res, Qty: jsonRes[i].Qty });
    }
    setCartItems(products);
  };
  const GetProduct = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    return data;
  };

  const increment = (productId) => {
    let products = localStorage.getItem("cartItems");
    products = JSON.parse(products);
    const updatedCartProducts = products.map((item) =>
      item.Id == productId ? { ...item, Qty: item.Qty + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartProducts));
    const updatedCart = cartItems.map((item) =>
      item.id == productId ? { ...item, Qty: item.Qty + 1 } : item
    );
    setCartItems(updatedCart);
  };
  const decrement = (productId) => {
    let products = localStorage.getItem("cartItems");
    products = JSON.parse(products);
    const updatedCartProducts = products.map((item) =>
      item.Id == productId && item.Qty > 1
        ? { ...item, Qty: item.Qty - 1 }
        : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartProducts));
    const updatedCart = cartItems.map((item) =>
      item.id == productId && item.Qty > 1
        ? { ...item, Qty: item.Qty - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeProduct = (productId) => {
    let products = localStorage.getItem("cartItems");
    products = JSON.parse(products);
    products = products.filter((item) => item.Id != productId);
    localStorage.setItem("cartItems", JSON.stringify(products));
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    removeFromCart();
  };
  return (
    <div>
      {cartToggle ? (
        <div className="w-full h-full bg-black/50 z-50 absolute top-12 right-0 transition duration-500 ease-in-out"></div>
      ) : (
        ""
      )}

      <div
        className={`h-full w-70 bg-white absolute right-0 top-12 transition-all duration-500 ease-in-out ${
          cartToggle ? "translate-x-0px" : "translate-x-full"
        } z-51 border-t-1 border-t-gray-300`}
      >
        <h1 className="text-center py-5 text-md font-semibold flex items-center gap-1 justify-center">
          <ShoppingBagIcon className="w-4 h-4"></ShoppingBagIcon>
          <span>Your Cart Items</span>
        </h1>
        <hr className="text-gray-300" />
        {cartItems.length === 0 ? (
          <div className="text-center mt-3 text-gray-400 text-md">
            No Items in cart
          </div>
        ) : (
          <div className="p-2 px-3 overflow-y-auto h-[80vh]">
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="mt-2 border-b-1 border-b-gray-300 pb-2"
                >
                  <div className="flex justify-between ">
                    <div className="flex  gap-2">
                      <div>
                        <img
                          src={item.thumbnail}
                          className="w-[70px] h-[70px] max-w-none border-1 border-gray-300"
                        />
                      </div>
                      <div>
                        <h2 className="text-[12px] font-semibold">
                          {item.title}
                        </h2>
                        <p className="text-[11px] font-semibold">
                          ${item.price}
                        </p>
                        <div className="border-1 border-gray-400 flex mt-3 w-fit rounded-xs">
                          <button
                            type="button"
                            className="cursor-pointer px-2"
                            onClick={() => decrement(item.id)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="outline-0 mx-3 w-[20px]"
                            readOnly
                            value={item.Qty}
                          />
                          <button
                            type="button"
                            className="cursor-pointer px-2"
                            onClick={() => increment(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeProduct(item.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"></TrashIcon>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
