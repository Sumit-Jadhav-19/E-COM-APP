import { useEffect, useState, useRef, useCallback } from "react";
import AddCart from "./AddCart";
import {StarIcon} from '@heroicons/react/24/outline';


const LIMIT = 10;
export default function Product() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const observer = useRef();

  // Ref to the last element
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prev) => prev + LIMIT);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // Fetch data
  const fetchData = () => {
    setLoading(true);
    try {
      fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.products.length === 0) {
            setHasMore(false);
          } else {
            setProducts((prev) => [...prev, ...data.products]);
          }
        });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };
  return (
    <>
      <div className="flex flex-wrap justify-between gap-y-3 p-2 mt-26 h-[90vh] overflow-x-auto">
        {products.map((item, index) => {
          if (products.length === index + 1) {
            return (
              <div
                className="w-[200px]  border-gray-200 rounded-md cursor-pointer shadow-md border-1 hover:shadow-2xl group"
                ref={lastProductRef}
                key={index}
              >
                <div className="border-b-1 border-gray-300">
                  <img className="h-auto w-100" src={item.thumbnail} />
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-sm truncate">{item.title}</h3>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs font-semibold">${item.price}</p>
                    <p className="text-xs"><StarIcon className="h-5 w-5 "></StarIcon>{item.rating}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleShowModal(item)}
                    className="text-xs  text-center w-[100%] border-1 border-gray-200 mt-2 p-1 rounded-sm cursor-pointer bg-gray-100 text-black  group-hover:bg-black group-hover:text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="w-[200px]  border-gray-200 rounded-md cursor-pointer shadow-md border-1 hover:shadow-2xl group"
            >
              <div className="border-b-1 border-gray-300">
                <img className="h-auto w-100" src={item.thumbnail} />
              </div>
              <div className="p-2">
                <h3 className="font-bold text-sm truncate">{item.title}</h3>
                <div className="flex justify-between mt-1">
                  <p className="text-xs font-bold">${item.price}</p>
                  <p className="text-xs flex gap-0.5"><StarIcon className="h-4 w-4 fill-amber-400 text-amber-400"></StarIcon>{item.rating}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleShowModal(item)}
                  className="text-xs  text-center w-[100%] border-1 border-gray-200 mt-2 p-1 rounded-sm cursor-pointer bg-gray-100 text-black  group-hover:bg-black group-hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}

        {loading && (
          <p className="mt-4 text-center text-gray-500 w-[100%]">Loading...</p>
        )}
        {!hasMore && (
          <p className="mt-4 text-center text-gray-500 w-[100%]">
            No more products
          </p>
        )}
        <AddCart
          isOpen={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </div>
    </>
  );
}
