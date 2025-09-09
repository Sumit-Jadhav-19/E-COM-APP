import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import {
  TrashIcon,
  ShoppingBagIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();
  const [loader, setLoader] = useState(false);
  const { cartCount } = useCart();
  useEffect(() => {
    loadCartItems();
  }, []);
  const loadCartItems = async () => {
    //setLoader(true);
    const saved = localStorage.getItem("cartItems");
    const jsonRes = saved ? JSON.parse(saved) : [];
    const products = [];
    for (let i = 0; i < jsonRes.length; i++) {
      const productId = jsonRes[i].Id;
      const res = await GetProduct(productId);
      products.push({ ...res, Qty: jsonRes[i].Qty });
    }
    //setLoader(false);
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
    <div className="mt-20 px-60">
      <div className="flex gap-5">
        <div className="flex-50">
          <h1 className="text-center text-md font-semibold flex items-center gap-1 justify-center">
            <ShoppingBagIcon className="w-4 h-4"></ShoppingBagIcon>
            <span>Cart Items ({cartCount})</span>
          </h1>
          <hr className="text-gray-300 my-4" />
          {cartItems.length === 0 ? (
            loader ? (
              <div className="text-center mt-3 text-gray-400 text-md">
                Loading....
              </div>
            ) : (
              <div className="text-center mt-3 text-gray-400 text-md">
                No Items in cart
              </div>
            )
          ) : (
            <div>
              <div className="p-2 px-3 h-[77vh] overflow-y-auto">
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
            </div>
          )}
        </div>
        <div className="flex-30">
          <h1 className="text-center text-md font-semibold flex items-center gap-1 justify-center">
            <span>Order Summery</span>
          </h1>
          <hr className="text-gray-300 my-4" />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-md font-semibold">Subtotal</h1>
              <p className="text-sm font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs text-gray-500 font-semibold">
                Delivery Fee
              </h1>
              <p className="text-xs text-gray-500 font-semibold">$ 0.00</p>
            </div>
            <hr className="text-gray-300 my-3" />
            <div className="flex justify-between items-center">
              <h1 className="text-md font-semibold">Total</h1>
              <p className="text-sm font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <Link className="w-full mt-4 bg-black p-2 text-white text-sm cursor-pointer rounded-xs hover:bg-black/75 text-center">
                Checkout
              </Link>
            </div>
            <div className="text-center mt-4">
              <p className="flex items-center justify-center gap-0.5">
                <LockClosedIcon className="h-4 w-4"></LockClosedIcon>
                <span className="text-xs font-semibold">Secure Checkout</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
