import { Link } from "react-router";
import { useCart } from "./CartContext";
import { useEffect, useRef, useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";

export default function Navbar({ setCartToggle }) {
  const cartRef = useRef();
  const menuRef = useRef();
  const menuIconRef = useRef();
  const { cartCount } = useCart();
  const [cart, setCart] = useState(true);
  const [menu, setMenu] = useState(false);
  const handleCart = () => {
    setCart(!cart);
    setCartToggle(cart);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        setCartToggle &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setCart(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartToggle]);

  useEffect(() => {
    const handleClickOutsideNav = (event) => {
      if (
        menuIconRef &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        if (
          menuRef &&
          menuRef.current &&
          !menuRef.current.contains(event.target)
        ) {
          setMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutsideNav);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
  }, [menu]);
  return (
    <>
      <div>
        <div className="fixed top-0 w-screen flex items-center justify-between px-4 py-2 bg-white shadow-xl border-b-1 border-b-gray-300">
          <div className="flex items-center gap-3">
            <div>
              <svg
                fill="#000000"
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 491.522 491.522"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M81.92,348.161h81.92c0,0,0.001,0,0.001,0c0,0,0.001,0,0.001,0h240.312c48.257,0,87.368-39.111,87.368-87.368V81.921
			c0-11.311-9.169-20.48-20.48-20.48H96.681L80.869,14.005C78.081,5.642,70.255,0.001,61.44,0.001H20.48
			C9.169,0.001,0,9.17,0,20.481s9.169,20.48,20.48,20.48h26.199l56.772,170.316c0.004,0.013,0.01,0.024,0.014,0.037l31.962,95.887
			H81.92c-45.103,0-81.92,36.817-81.92,81.92s36.817,81.92,81.92,81.92h87.409c7.081,12.242,20.305,20.48,35.471,20.48
			c15.166,0,28.39-8.238,35.471-20.48h174.818c7.081,12.242,20.305,20.48,35.471,20.48c22.63,0,40.96-18.33,40.96-40.96
			s-18.33-40.96-40.96-40.96c-15.166,0-28.39,8.238-35.471,20.48H240.271c-7.081-12.242-20.305-20.48-35.471-20.48
			c-15.166,0-28.39,8.238-35.471,20.48H81.92c-22.481,0-40.96-18.479-40.96-40.96S59.439,348.161,81.92,348.161z M327.68,184.321
			v40.96h-81.92v-40.96H327.68z M245.76,143.361v-40.96h81.92v40.96H245.76z M368.64,225.281v-40.96h81.922v40.96H368.64z
			 M327.68,266.241v40.96h-81.92v-40.96H327.68z M204.8,225.281h-53.503l-13.653-40.96H204.8V225.281z M204.8,266.241v40.96h-26.197
			l-13.653-40.96H204.8z M404.154,307.201H368.64v-40.96h81.593C447.536,289.306,427.945,307.201,404.154,307.201z M450.562,143.361
			H368.64v-40.96h81.922V143.361z M204.8,102.401v40.96h-80.81l-13.653-40.96H204.8z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <h1 className="font-bold text-3xl text-black font-serif">E COM</h1>
          </div>
          <div className="flex">
            <ul className="hidden md:visible md:flex items-center justify-between px-4 gap-3">
              <li className="cursor-pointer font-medium hover:text-indigo-500 text-lg">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-lg">
                <Link to="/about">About</Link>
              </li>
              <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-lg">
                <Link to="/contact">Contact</Link>
              </li>
              <Link
                to="/login"
                className="flex gap-1 items-center pe-4 py-1 text-lg cursor-pointer rounded-sm text-center font-medium hover:text-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </Link>
            </ul>

            <div className="flex items-center gap-2">
              <div
                className="cursor-pointer hover:text-indigo-500 relative"
                onClick={handleCart}
                ref={cartRef}
              >
                <span className="absolute top-[-11px] right-[-5px] bg-black text-white w-[20px] h-[20px] rounded-[50%] text-[12px] text-center">
                  {cartCount}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="md:hidden mx-2">
                <Bars3BottomLeftIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setMenu(!menu)}
                  ref={menuIconRef}
                ></Bars3BottomLeftIcon>
                {menu ? (
                  <div className="w-screen h-screen bg-black/50 z-50 absolute top-12 right-0 transition duration-500 ease-in-out"></div>
                ) : (
                  ""
                )}

                <ul
                  className={`flex flex-col absolute top-[48px] right-0 h-screen w-[250px] items-center justify-start bg-white px-4 gap-3 transition-all duration-500 ease-in-out transform ${
                    menu ? "translate-x-0px" : "translate-x-full"
                  } z-51 border-t-1 border-t-gray-400`}
                  ref={menuRef}
                >
                  <li className="cursor-pointer font-medium hover:text-indigo-500 text-lg mt-3">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-lg">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-lg">
                    <Link to="/contact">Contact</Link>
                  </li>
                  <Link
                    to="/login"
                    className="flex gap-1 items-center pe-4 py-1 text-lg cursor-pointer rounded-sm text-center font-medium hover:text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Login
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
