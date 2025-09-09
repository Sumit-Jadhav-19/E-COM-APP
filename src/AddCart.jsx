import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";
import { Link } from "react-router";

export default function ProductModal({ isOpen, onClose, product }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen && product != null) {
      setCount(1);
    }
  }, [product, isOpen]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const addCart = () => {
    onClose();
    showToast(true);
    const products = localStorage.getItem("cartItems");
    setCartItems(JSON.parse(products));
    handleAddToCart(product, count);
  };
  const handleAddToCart = (product, count) => {
    setCartItems((prevItems) => {
      console.log(prevItems);
      const itemExists = prevItems.find((item) => item.Id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.Id == product.id ? { ...item, Qty: item.Qty + count } : item
        );
      } else {
        return [...prevItems, { Id: product.id, Qty: count }];
      }
    });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    addToCart();
  }, [cartItems]);

  if (!isOpen || !product) return null;
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 ">
      <div
        className={`bg-white rounded-xs shadow-lg w-full max-w-2xl p-6 relative border-1 border-gray-300 `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl font-bold bg-gray-100 px-[7px] py-[2px] rounded-[50%] cursor-pointer shadow-md hover:shadow-xl"
        >
          &times;
        </button>

        <div className="flex mt-4">
          <div>
            <img src={product.thumbnail} className="md:min-w-80 md:min-h-80" />
          </div>
          <div className="w-100">
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            {product.brand && (
              <p className="text-gray-500 mb-1 text-xs">
                Brand: {product.brand}
              </p>
            )}
            <span className="text-gray-700 font-semibold mb-2 mt-2">
              ${product.price}
            </span>
            <span className="ms-2 text-md line-through text-gray-500">
              $
              {(
                product.price +
                (product.price / 100) * product.discountPercentage
              ).toFixed(2)}
            </span>
            <p className="text-gray-400 text-xs mt-2">SKU: {product.sku} </p>
            {product.availabilityStatus.toUpperCase() == "IN STOCK" ? (
              <p className="text-green-600 text-md mt-2">
                {product.availabilityStatus}
              </p>
            ) : product.availabilityStatus.toUpperCase() == "LOW STOCK" ? (
              <p className="text-yellow-600 text-md mt-2">
                {product.availabilityStatus}
              </p>
            ) : (
              <p className="text-red-600 text-md mt-2">
                {product.availabilityStatus}
              </p>
            )}
            <div className="border-1 border-gray-600 p-1 px-2 flex mt-3 w-fit rounded-xs">
              <button
                type="button"
                className="cursor-pointer px-2"
                onClick={decrement}
              >
                -
              </button>
              <input
                type="text"
                className="outline-0 mx-3 w-[20px]"
                readOnly
                value={count}
              />
              <button
                type="button"
                className="cursor-pointer px-2"
                onClick={increment}
              >
                +
              </button>
            </div>
            {product.availabilityStatus.toUpperCase() == "OUT OF STOCK" ? (
              <button
                type="button"
                className="text-xs text-center w-[100%] border-1 border-gray-200 mt-20 p-2 rounded-sm cursor-pointer bg-black text-white hover:underline disabled:bg-black/50 disabled:cursor-default"
                disabled
              >
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                className="text-xs text-center w-[100%] border-1 border-gray-200 mt-20 p-2 rounded-sm cursor-pointer bg-black text-white hover:underline"
                onClick={addCart}
              >
                Add to Cart
              </button>
            )}
            <Link to='/productdetails' state={product.id} className="text-xs font-semibold hover:underline " href="#">View more details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
