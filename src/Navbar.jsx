import { useCart } from "./CartContext";

export default function Navbar({setCartToggle}) {
  const { cartCount } = useCart();
  return (
    <div>
      <div className="fixed top-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-xl border-b-1 border-b-gray-300">
        <div>
          <h1 className="font-bold text-2xl text-indigo-600">E-COM</h1>
        </div>
        <div>
          <ul className="flex items-center justify-between px-4 gap-3">
            <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-sm">
              Home
            </li>
            <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-sm">
              About
            </li>
            <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-sm">
              Contact
            </li>
            <li className="cursor-pointer text-md font-medium hover:text-indigo-500 text-sm">
              FAQ'S
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="flex gap-1 items-center px-4 py-1 text-sm cursor-pointer rounded-sm text-center font-medium hover:text-indigo-500">
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
            <span>Login</span>
          </h2>
          <div className="cursor-pointer hover:text-indigo-500 relative"
          onClick={setCartToggle}
          >
            <span className="absolute top-[-11px] right-[-5px] bg-black text-white w-[17px] h-[17px] rounded-[50%] text-[10px] text-center">
              {cartCount}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
