import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router";
export default function Cart({ cartToggle, setCartToggle }) {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();
  const [loader, setLoader] = useState(false);
  const cartRef = useRef();
  const viewCartRef = useRef();

  useEffect(() => {
    if (cartToggle) {
      loadCartItems();
    }
  }, [cartToggle]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (cartToggle &&
          cartRef.current &&
          !cartRef.current.contains(event.target)) ||
        (viewCartRef.current && viewCartRef.current.contains(event.target))
      ) {
        setCartToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartToggle, setCartToggle]);
  const loadCartItems = async () => {
    setLoader(true);
    const saved = localStorage.getItem("cartItems");
    const jsonRes = saved ? JSON.parse(saved) : [];
    const products = [];
    for (let i = 0; i < jsonRes.length; i++) {
      const productId = jsonRes[i].Id;
      const res = await GetProduct(productId);
      products.push({ ...res, Qty: jsonRes[i].Qty });
    }
    setLoader(false);
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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.Qty * item.price,
    0
  );
  return (
    <div>
      {cartToggle ? (
        <div className="w-full h-full bg-black/50 z-50 absolute top-12 right-0 transition duration-500 ease-in-out"></div>
      ) : (
        ""
      )}

      <div
        className={`h-full min-w-[340px]  bg-white absolute right-0 top-12 transition-all duration-500 ease-in-out ${
          cartToggle ? "translate-x-0px" : "translate-x-full"
        } z-51 border-t-1 border-t-gray-300`}
        ref={cartRef}
      >
        <h1 className="text-center py-3 text-xl font-semibold flex items-center gap-1 justify-center">
          <ShoppingBagIcon className="w-6 h-6"></ShoppingBagIcon>
          <span>Cart Items</span>
        </h1>
        <hr className="text-gray-300" />
        {cartItems.length === 0 ? (
          loader ? (
            <div className="text-center mt-3 text-gray-400 text-lg">
              Loading....
            </div>
          ) : (
            <div className="text-center mt-3 text-gray-400 text-lg">
              No Items in cart
            </div>
          )
        ) : (
          <div>
            <div className="p-2 px-3 h-[60vh] overflow-y-auto">
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
                            className="w-[100px] h-[100px] max-w-none border-1 border-gray-300"
                          />
                        </div>
                        <div>
                          <h2 className="text-[1em] font-semibold">
                            {item.title}
                          </h2>
                          <p className="text-[0.9em] font-semibold">
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
                          <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"></TrashIcon>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Estimated total</h1>
                <p className="text-xl font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Taxes and shipping are calculated at checkout.
              </div>
              <div className="flex flex-col">
                <Link className="w-full mt-4 bg-black p-2 text-white text-lg cursor-pointer rounded-xs hover:bg-black/75 text-center">
                  Checkout
                </Link>
                <Link
                  className="w-[100%] mt-4  p-2 text-black border-1 border-black text-lg cursor-pointer rounded-xs hover:bg-black/5 text-center"
                  to="/viewcart"
                  ref={viewCartRef}
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
