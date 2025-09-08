import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useCart } from "./CartContext";
import {
  ArrowRightCircleIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnLeftIcon,
  SwatchIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function ProductDetails() {
  const location = useLocation();
  const productId = location.state || 0;
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(null);

  const addCart = () => {
    const products = localStorage.getItem("cartItems");
    setCartItems(JSON.parse(products));
    handleAddToCart(product, qty);
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
  const fetchData = () => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setProduct(res);
        setSelectedImg(res.thumbnail);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const increment = () => setQty((prev) => prev + 1);
  const decrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div className="mt-15 px-20 py-10 overflow-y-auto h-[90vh]">
      <div className="flex w-[100%]">
        <div className="w-[50%] flex flex-col items-center">
          <div className="border-1 border-gray-200 ">
            <img className="h-auto w-100" src={selectedImg} />
          </div>
          <div className="flex mt-3 gap-2">
            {product.images &&
              product.images.map((item, index) => {
                return (
                  <img
                    key={index}
                    className="h-auto w-13 border-1 border-gray-300 p-0.5 cursor-pointer"
                    src={item}
                    onClick={() => setSelectedImg(item)}
                  />
                );
              })}
          </div>
        </div>
        <div className="w-[40%]">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-xs mt-2 font-normal text-gray-500 ">
            SKU : {product.sku}
          </p>
          <div className="mt-3">
            <span className="text-gray-700 font-semibold ">
              ${product.price}
            </span>
            <span className="ms-2 text-md line-through text-gray-500">
              $
              {(
                product.price +
                (product.price / 100) * product.discountPercentage
              ).toFixed(2)}
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold">Quantity </p>
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
              value={qty}
            />
            <button
              type="button"
              className="cursor-pointer px-2"
              onClick={increment}
            >
              +
            </button>
          </div>
          {product.availabilityStatus &&
          product.availabilityStatus.toUpperCase() == "IN STOCK" ? (
            <p className="text-green-600 text-md mt-3">
              {product.availabilityStatus}
            </p>
          ) : product.availabilityStatus &&
            product.availabilityStatus.toUpperCase() == "LOW STOCK" ? (
            <p className="text-yellow-600 text-md mt-3">
              {product.availabilityStatus}
            </p>
          ) : (
            <p className="text-red-600 text-md mt-3">
              {product.availabilityStatus}
            </p>
          )}
          {product.availabilityStatus &&
          product.availabilityStatus.toUpperCase() == "OUT OF STOCK" ? (
            <button
              type="button"
              className="text-xs text-center w-[100%] border-1 border-gray-200 mt-10 p-2 rounded-sm cursor-pointer bg-black text-white hover:underline disabled:bg-black/50 disabled:cursor-default"
              disabled
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              className="text-xs text-center w-[100%] border-1 border-gray-200 mt-10 p-2 rounded-sm cursor-pointer bg-black text-white hover:underline"
              onClick={addCart}
            >
              Add to Cart
            </button>
          )}
          <div className="text-xs mt-2">{product.description}</div>
          <div className="mt-4 flex items-center justify-between bg-amber-300 py-4 px-2 border-1 border-gray-300">
            <div className="flex items-center gap-1">
              <TruckIcon className="h-5 w-5 fill-black text-black"></TruckIcon>
              <span className="text-xs font-semibold">
                {product.shippingInformation}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowPathRoundedSquareIcon className="h-5 w-5 text-black"></ArrowPathRoundedSquareIcon>
              <span className="text-xs font-semibold">
                {product.returnPolicy}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <SwatchIcon className="h-5 w-5 text-black"></SwatchIcon>
              <span className="text-xs font-semibold">
                {product.warrantyInformation}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-4 text-gray-300" />
      <p className="mt-3 flex items-center gap-0.5">
        <span className="font-medium">Rating : </span>
        <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400"></StarIcon>
        {product.rating}
      </p>
      <div className="mt-3">
        <span className="font-medium">Reviews</span>
        <ul className="ms-4">
          {product.reviews &&
            product.reviews.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-5 w-5 text-black"></UserCircleIcon>
                    <p className="text-sm">{item.reviewerName}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="text-[10px] ms-8  flex items-center gap-0.5 text-gray-400">
                      <span>Rating :</span>{" "}
                      <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400"></StarIcon>
                      {item.rating}
                    </p>
                    <p className="text-[10px] ms-8  flex items-center gap-0.5 text-gray-400">
                      <span>Date : </span> {item.date.replace("T", " ").split('.')[0]}
                    </p>
                  </div>
                  <p className="text-xs ms-8 mt-1 mb-2">{item.comment}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
